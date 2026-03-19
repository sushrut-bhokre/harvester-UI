// ZEUS UI - API Translation Diagnostic Script
// Run this in browser console after logging into the UI

(function() {
  console.log('========================================');
  console.log('ZEUS UI Diagnostic Script');
  console.log('========================================\n');

  // Get Vue app instance
  const app = document.querySelector('#app').__vue__;
  const store = app.$store;

  // Test 1: Check if harvester store is loaded
  console.log('1. STORE STATUS');
  console.log('---------------');
  const hasHarvesterStore = !!store.state.harvester;
  console.log(`✓ Harvester store loaded: ${hasHarvesterStore}`);

  if (!hasHarvesterStore) {
    console.error('❌ Harvester store not found! Cannot continue diagnostics.');
    return;
  }

  // Test 2: Schema Translation Check
  console.log('\n2. SCHEMA TRANSLATION CHECK');
  console.log('---------------------------');

  const zeusTypes = [
    'zeushci.io.setting',
    'zeushci.io.addon',
    'zeushci.io.virtualmachinetemplateversion',
    'zeushci.io.virtualmachineimage',
    'zeushci.io.volume',
    'kubevirt.io.virtualmachine'
  ];

  const schemaResults = {};
  zeusTypes.forEach(type => {
    const schema = store.getters['harvester/schemaFor'](type);
    const exists = !!schema;
    schemaResults[type] = exists;
    console.log(`${exists ? '✓' : '❌'} ${type}: ${exists ? 'FOUND' : 'NOT FOUND'}`);
  });

  const allSchemasFound = Object.values(schemaResults).every(v => v);
  console.log(`\nResult: ${allSchemasFound ? '✅ ALL SCHEMAS FOUND' : '❌ SOME SCHEMAS MISSING'}`);

  // Test 3: Resource Counts
  console.log('\n3. RESOURCE COUNTS');
  console.log('------------------');

  const resourceCounts = {};
  zeusTypes.forEach(type => {
    try {
      const resources = store.getters['harvester/all'](type) || [];
      const count = resources.length;
      resourceCounts[type] = count;
      console.log(`${count > 0 ? '✓' : '⚠'} ${type}: ${count} resource(s)`);
    } catch (e) {
      resourceCounts[type] = 'ERROR';
      console.log(`❌ ${type}: ERROR - ${e.message}`);
    }
  });

  const hasNonZeroCounts = Object.values(resourceCounts).some(v => typeof v === 'number' && v > 0);
  console.log(`\nResult: ${hasNonZeroCounts ? '✅ RESOURCES LOADED' : '⚠ NO RESOURCES FOUND (might be empty cluster)'}`);

  // Test 4: Check for harvesterhci.io in store (should be translated to zeushci.io)
  console.log('\n4. TRANSLATION VERIFICATION');
  console.log('----------------------------');

  const allSchemas = store.getters['harvester/all']('schema') || [];
  const untranslatedSchemas = allSchemas.filter(s => s.id && s.id.includes('harvesterhci.io'));

  if (untranslatedSchemas.length > 0) {
    console.error(`❌ FOUND ${untranslatedSchemas.length} UNTRANSLATED SCHEMAS:`);
    untranslatedSchemas.slice(0, 5).forEach(s => {
      console.log(`   - ${s.id}`);
    });
    if (untranslatedSchemas.length > 5) {
      console.log(`   ... and ${untranslatedSchemas.length - 5} more`);
    }
  } else {
    console.log('✅ All schemas properly translated (no harvesterhci.io found)');
  }

  // Test 5: Check specific settings for sidebar
  console.log('\n5. SIDEBAR RESOURCES CHECK');
  console.log('--------------------------');

  const sidebarChecks = {
    'Settings': 'zeushci.io.setting',
    'Add-ons': 'zeushci.io.addon',
    'Templates': 'zeushci.io.virtualmachinetemplateversion',
    'Images': 'zeushci.io.virtualmachineimage'
  };

  Object.entries(sidebarChecks).forEach(([name, type]) => {
    const schema = store.getters['harvester/schemaFor'](type);
    const resources = store.getters['harvester/all'](type) || [];
    const count = resources.length;

    const status = schema ? (count > 0 ? '✅' : '⚠') : '❌';
    console.log(`${status} ${name}: Schema=${!!schema}, Count=${count}`);
  });

  // Test 6: WebSocket Status
  console.log('\n6. WEBSOCKET CONNECTION');
  console.log('-----------------------');

  const socketState = store.state.harvester?.socket;
  if (socketState) {
    console.log(`✓ Socket exists: ${!!socketState.socket}`);
    console.log(`✓ Connected: ${socketState.socket?.readyState === 1}`);
    console.log(`✓ OnMessage wrapped: ${socketState.socket?.onmessage?.toString().includes('translateObject') || 'Unknown'}`);
  } else {
    console.log('⚠ WebSocket not initialized yet');
  }

  // Test 7: Action availability check
  console.log('\n7. EDIT ACTION AVAILABILITY');
  console.log('----------------------------');

  try {
    const settings = store.getters['harvester/all']('zeushci.io.setting') || [];
    if (settings.length > 0) {
      const firstSetting = settings[0];
      const actions = firstSetting._availableActions || [];
      const hasEditAction = actions.some(a => a.action === 'goToEdit');
      console.log(`${hasEditAction ? '✅' : '❌'} Edit action available on settings: ${hasEditAction}`);
      console.log(`   Total actions: ${actions.length}`);
    } else {
      console.log('⚠ No settings found to check actions');
    }
  } catch (e) {
    console.log(`❌ Error checking actions: ${e.message}`);
  }

  // Test 8: Check for API errors in network
  console.log('\n8. RECENT API ACTIVITY');
  console.log('----------------------');
  console.log('Open DevTools → Network tab and filter by:');
  console.log('  - "harvesterhci" to see backend requests (should be 200 OK)');
  console.log('  - "zeushci" to see if any mistaken client requests (should be 0)');
  console.log('Check Console for any 404 or schema-related errors');

  // Summary
  console.log('\n========================================');
  console.log('DIAGNOSTIC SUMMARY');
  console.log('========================================');

  const issues = [];
  if (!allSchemasFound) issues.push('Some schemas not found');
  if (!hasNonZeroCounts) issues.push('No resources loaded (might be normal)');
  if (untranslatedSchemas.length > 0) issues.push('Untranslated schemas detected');

  if (issues.length === 0) {
    console.log('✅ ALL CHECKS PASSED - Translation working correctly!');
  } else {
    console.log('⚠ ISSUES DETECTED:');
    issues.forEach(issue => console.log(`   - ${issue}`));
  }

  console.log('\nTo investigate further:');
  console.log('1. Check browser Network tab for 404 errors');
  console.log('2. Look for console errors mentioning "schema"');
  console.log('3. Verify backend is running and accessible');
  console.log('4. Try refreshing the page');

  // Export results for further analysis
  window.zeusDebugInfo = {
    schemas: schemaResults,
    counts: resourceCounts,
    untranslatedSchemas: untranslatedSchemas.map(s => s.id),
    timestamp: new Date().toISOString()
  };

  console.log('\n💾 Debug info saved to: window.zeusDebugInfo');
  console.log('========================================\n');
})();
