<script>
import CreateEditView from '@shell/mixins/create-edit-view';
import ArrayList from '@shell/components/form/ArrayList.vue';

export default {
  name: 'HarvesterNtpServersConfig',

  components: { ArrayList },

  mixins: [CreateEditView],

  data() {
    let parseDefaultValue = {};

    try {
      parseDefaultValue = JSON.parse(this.value.value);
    } catch (error) {
      parseDefaultValue = { ntpServers: [] };
    }

    return { parseDefaultValue };
  },

  watch: {
    value: {
      handler(neu) {
        let parseDefaultValue;

        try {
          parseDefaultValue = JSON.parse(neu.value);
        } catch (err) {
          parseDefaultValue = { ntpServers: [] };
        }

        this['parseDefaultValue'] = parseDefaultValue;
        this.update();
      },
      deep: true
    }
  },

  methods: {
    useDefault() {
      const parseDefaultValue = { ntpServers: [] };

      this['parseDefaultValue'] = parseDefaultValue;
    },

    update() {
      const value = JSON.stringify(this.parseDefaultValue);

      this.value['value'] = value;
    },
  },
};
</script>

<template>
  <div class="row">
    <div class="col span-12">
      <ArrayList
        v-model:value="parseDefaultValue.ntpServers"
        :title="t('zeus.host.ntp.label')"
        :protip="t('zeus.host.ntp.tips')"
        :value-placeholder="t('zeus.host.ntp.placeholder')"
        :mode="mode"
        @update:value="update"
      />
    </div>
  </div>
</template>
