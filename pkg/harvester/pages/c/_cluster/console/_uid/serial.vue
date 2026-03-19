<script>
import Loading from '@shell/components/Loading';
import { HCI } from '../../../../../types';
import SerialConsole from '../../../../../components/SerialConsole';

export default {
  components: { SerialConsole, Loading },

  async fetch() {
    this.rows = await this.$store.dispatch('harvester/findAll', { type: HCI.VMI });
  },

  data() {
    return { uid: this.$route.params.uid };
  },

  computed: {
    vmi() {
      const vmiList = this.$store.getters['harvester/all'](HCI.VMI) || [];
      const vmi = vmiList.find( (VMI) => {
        return VMI?.metadata?.ownerReferences?.[0]?.uid === this.uid;
      });

      return vmi;
    },
  },

  mounted() {
    window.addEventListener('beforeunload', () => {
      this.$refs.serialConsole.close();
    });
  },

  head() {
    return { title: this.vmi?.metadata?.name };
  },
};
</script>

<template>
  <Loading v-if="$fetchState.pending" />
  <SerialConsole
    v-else
    ref="serialConsole"
    v-model:value="vmi"
  />
</template>

<style>
  HTML, BODY, MAIN, #__nuxt, #__layout, #app, .harvester-shell-container, .harvester-shell-container > DIV {
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  MAIN {
    padding-top: 0 !important;
  }
</style>
