import { HCI } from '../types';
import HarvesterResource from '@pkg/harvester/models/harvester';

export default class HciBlockDevice extends HarvesterResource {
  get isParent() {
    const parent = this.status?.deviceStatus?.parentDevice;

    return !parent || parent === "";
  }

  get childParts() {
    const inStore = this.$rootGetters['currentProduct'].inStore;
    const bds = this.$rootGetters[`${inStore}/all`](HCI.BLOCK_DEVICE);

    const parts = bds.filter((b) => {
      return b.status?.deviceStatus?.parentDevice === this.spec?.devPath &&
        b.spec.nodeName === this.spec.nodeName;
    });

    return parts;
  }

  get isChildPartProvisioned() {
    const parts = this.childParts.filter((p) => p.isProvisioned) || [];

    return parts.length > 0;
  }

  get provisionPhase() {
    const label = this?.status?.provisionPhase;
    let color = '';
    let icon = '';

    switch (label) {
      case 'Provisioned':
        color = 'bg-success';
        icon = 'icon-checkmark';
        break;
      case 'Unprovisioning':
        color = 'bg-warning';
        icon = 'icon-warning';
        break;
      case 'NotProvisioned':
        color = 'bg-error';
        icon = 'icon-warning';
        break;
      default:
        break;
    }

    return {
      label,
      color,
      icon,
    };
  }

  get displayName() {
    return this.status?.deviceStatus?.devPath || this?.metadata?.name;
  }

  get isFormatting() {
    const conditions = this?.status?.conditions || [];
    const formatting = conditions.find((c) => c.type === 'Formatting') || {};

    return formatting.status === 'True';
  }

  get isProvisioned() {
    // spec.fileSystem.provisioned is deprecated
    return this.spec?.fileSystem?.provisioned || this.spec?.provision;
  }

  // Overwrite cleanForSave() in shell/plugins/steve/steve-class.js as it deleted status object in zeushci.io.blockdevice CRD
  // but /v1/harvester/zeushci.io.blockdevices/longhorn-system/{id} API requires status object
  cleanForSave(data) {
    return data;
  }
}
