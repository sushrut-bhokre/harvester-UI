<script>
import { Banner } from '@components/Banner';
import { DOC } from '../config/doc-links';
import { docLink } from '@pkg/harvester/utils/feature-flags';

export default {
  name: 'HarvesterUpgradeInfo',

  components: { Banner },

  props: {
    version: {
      type:    String,
      default: ''
    }
  },

  computed: {
    releaseVersion() {
      return !!this.version ? `https://github.com/harvester/harvester/releases/tag/${ this.version }` : `https://github.com/harvester/harvester/releases`;
    },

    upgradeLink() {
      const version = this.$store.getters['harvester-common/getServerVersion']();

      return docLink(DOC.UPGRADE_URL, version);
    }
  },
};
</script>

<template>
  <div>
    <Banner color="warning">
      <div>
        <strong>{{ t('zeus.upgradePage.upgradeInfo.warning') }}:</strong>
        <p
          v-clean-html="t('zeus.upgradePage.upgradeInfo.doc', {url: upgradeLink}, true)"
          class="mb-5"
        ></p>

        <p class="mb-5">
          {{ t('zeus.upgradePage.upgradeInfo.tip') }}
        </p>

        <p>
          {{ t('zeus.upgradePage.upgradeInfo.moreNotes') }} <a
            :href="releaseVersion"
            target="_blank"
          >{{ t('generic.moreInfo') }}</a>
        </p>
      </div>
    </Banner>
  </div>
</template>
