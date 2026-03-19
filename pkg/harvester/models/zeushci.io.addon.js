import jsyaml from 'js-yaml';
import startCase from 'lodash/startCase';
import { HCI as HCI_ANNOTATIONS } from '../config/labels-annotations';
import HarvesterResource from '@pkg/harvester/models/harvester';
import { HCI } from '../types';

export default class HciAddonConfig extends HarvesterResource {
  constructor() {
    super(...arguments);
    console.log(`[ZEUS] HciAddonConfig model instantiated for: ${this.id}`);
  }

  get availableActions() {
    console.log(`[ZEUS] availableActions called for: ${this.id}`);
    const out = super._availableActions || [];

    if (this.id === 'harvester-system/rancher-vcluster') {
      const rancherDashboard = {
        action: 'goToRancher',
        enabled: this.spec.enabled,
        icon: 'icon icon-external-link',
        label: this.t('zeus.addons.rancherVcluster.accessRancher'),
      };

      out.push(rancherDashboard);
    }

    const toggleAddon = {
      action: 'toggleAddon',
      enabled: true,
      icon: this.spec.enabled ? 'icon icon-pause' : 'icon icon-play',
      label: this.spec.enabled ? this.t('generic.disable') : this.t('generic.enable'),
    };

    // Forcefully inject Edit Config since Steve base model suppresses it
    // due to the client-side API rebrand confusing RBAC/schema methods
    const editConfig = {
      action: 'goToEdit',
      enabled: true,
      icon: 'icon icon-edit',
      label: this.t('generic.editConfig') || 'Edit Config',
    };

    // Make sure we don't duplicate if Steve somehow decides to include it
    if (!out.find(a => a.action === 'goToEdit')) {
      out.unshift(editConfig);
    }

    out.unshift(toggleAddon);

    return out;
  }

  async toggleAddon() {
    const enableHistory = this.spec.enabled;

    try {
      if (!this.spec.enabled && this.id === 'rancher-vcluster/rancher-vcluster') {
        const valuesContent = jsyaml.load(this.spec.valuesContent);

        if (!valuesContent.hostname || !valuesContent.bootstrapPassword) {
          this.goToEdit();

          return;
        }
      }

      this.spec.enabled = !this.spec.enabled;
      await this.save();
    } catch (err) {
      this.spec.enabled = enableHistory;
      this.$dispatch('growl/fromError', {
        title: this.t('zeus.addons.switchFailed', { action: enableHistory ? this.t('generic.disable') : this.t('generic.enable'), name: (this.metadata.name) }),
        err,
      }, { root: true });
    }
  }

  goToRancher() {
    const valuesContent = jsyaml.load(this.spec.valuesContent);

    window.open(
      `https://${valuesContent.hostname}`,
      '_blank',
    );
  }

  get rancherHostname() {
    const valuesContent = jsyaml.load(this.spec.valuesContent);

    return `https://${valuesContent.hostname}`;
  }

  get stateColor() {
    const state = this.stateDisplay;

    if (state?.toLowerCase().includes('enabled') || state?.toLowerCase().includes('success')) {
      return 'text-success';
    } else if (state === 'Disabled') {
      return 'text-darker';
    } else if (state?.toLowerCase().includes('ing')) {
      return 'text-info';
    } else if (state?.toLowerCase().includes('failed') || state?.toLowerCase().includes('error')) {
      return 'text-error';
    } else {
      return 'text-info';
    }
  }

  get stateDisplay() {
    const out = this?.status?.status;

    if (!out) {
      return 'Disabled';
    }

    if (out.startsWith('Addon')) {
      return startCase(out.replace('Addon', ''));
    }

    return out;
  }

  get stateDescription() {
    const failedCondition = (this.status?.conditions || []).find((C) => C.type === 'OperationFailed');

    return failedCondition?.message || super.stateDescription;
  }

  get parentNameOverride() {
    return this.$rootGetters['i18n/t'](`typeLabel."${HCI.ADD_ONS}"`, { count: 1 })?.trim();
  }

  get displayName() {
    const isExperimental = this.metadata?.labels?.[HCI_ANNOTATIONS.ADDON_EXPERIMENTAL] === 'true';
    let name = this.metadata?.labels?.[HCI_ANNOTATIONS.ADDON_DISPLAYNAME] || this.metadata.name;

    // Rebrand display names from rancher/cattle to ZEUS
    const DISPLAY_NAME_MAP = {
      'rancher-monitoring': 'zeus-monitoring',
      'rancher-logging': 'zeus-logging',
      'rancher-vcluster': 'zeus-vcluster',
      'harvester-seeder': 'zeus-seeder',
    };

    if (DISPLAY_NAME_MAP[name]) {
      name = DISPLAY_NAME_MAP[name];
    }

    return isExperimental ? `${name} (${this.t('generic.experimental')})` : name;
  }

  get customValidationRules() {
    let rules = [];

    if (this.metadata.name === 'rancher-monitoring') {
      rules = [
        {
          nullable: false,
          path: 'spec.valuesContent',
          validators: ['rancherMonitoring'],
        },
      ];
    }

    if (this.metadata.name === 'rancher-logging') {
      rules = [
        {
          nullable: false,
          path: 'spec.valuesContent',
          validators: ['rancherLogging'],
        },
      ];
    }

    return rules;
  }
}
