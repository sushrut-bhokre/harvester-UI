<script>
import LabelValue from '@shell/components/LabelValue';
import Tabbed from '@shell/components/Tabbed';
import Tab from '@shell/components/Tabbed/Tab';
import { BACKUP_TYPE } from '../../config/types';
import BackupList from './BackupList';
import SnapshotList from './SnapshotList';
import cronstrue from 'cronstrue';

export default {
  name:       'ScheduleVmBackupDetail',
  components: {
    BackupList,
    SnapshotList,
    Tab,
    Tabbed,
    LabelValue,
  },

  props: {
    value: {
      type:     Object,
      required: true,
    },
  },

  computed: {
    isBackup() {
      return this.value.spec.vmbackup.type === BACKUP_TYPE.BACKUP;
    },
    isSnapshot() {
      return this.value.spec.vmbackup.type === BACKUP_TYPE.SNAPSHOT;
    },
    cronExpression() {
      let cronHint = '';

      try {
        cronHint = cronstrue.toString(this.value.spec.cron, { verbose: true });
      } catch (e) {
        cronHint = this.t('generic.invalidCron');
      }

      return cronHint ? `${ this.value.spec.cron } (${ cronHint })` : this.value.spec.cron;
    }
  }
};
</script>

<template>
  <Tabbed
    v-bind="$attrs"
    class="mt-15"
    :side-tabs="true"
  >
    <Tab
      name="basic"
      :label="t('zeus.virtualMachine.detail.tabs.basics')"
      class="bordered-table"
      :weight="99"
    >
      <div class="row">
        <div class="col span-6 mb-20">
          <LabelValue
            :name="t('zeus.schedule.detail.namespace')"
            :value="value.metadata.namespace"
          />
        </div>
        <div class="col span-6 mb-20">
          <LabelValue
            :name="t('zeus.schedule.detail.sourceVM')"
            :value="value.spec.vmbackup.source.name"
          />
        </div>
      </div>
      <div class="row">
        <div class="col span-6 mb-20">
          <LabelValue
            :name="t('zeus.schedule.cron.label')"
            :value="cronExpression"
          />
        </div>
        <div class="col span-6 mb-20">
          <LabelValue
            :name="t('zeus.schedule.scheduleType')"
            :value="value.spec.vmbackup.type"
          />
        </div>
      </div>
      <div class="row">
        <div class="col span-6 mb-20">
          <LabelValue
            :name="t('zeus.schedule.retain.label')"
            :value="value.spec.retain"
          />
        </div>
        <div class="col span-6 mb-20">
          <LabelValue
            :name="t('zeus.schedule.maxFailure.label')"
            :value="value.spec.maxFailure"
          />
        </div>
      </div>
    </Tab>
    <Tab
      v-if="isBackup"
      name="backups"
      :label="t('zeus.schedule.tabs.backups')"
      :weight="89"
      class="bordered-table"
    >
      <BackupList :id="value.id" />
    </Tab>
    <Tab
      v-if="isSnapshot"
      name="snapshots"
      :label="t('zeus.schedule.tabs.snapshots')"
      :weight="79"
      class="bordered-table"
    >
      <SnapshotList :id="value.id" />
    </Tab>
  </Tabbed>
</template>

<style lang="scss" scoped>
.error {
  color: var(--error);
}
</style>
