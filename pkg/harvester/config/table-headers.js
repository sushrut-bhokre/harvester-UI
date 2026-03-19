/**
 * Harvester
 */
import { DESCRIPTION } from '@shell/config/table-headers';

// image
export const IMAGE_DOWNLOAD_SIZE = {
  name:     'downloadedBytes',
  labelKey: 'tableHeaders.size',
  value:    'downSize',
  sort:     'status.size',
};

export const IMAGE_VIRTUAL_SIZE = {
  name:     'virtualSize',
  labelKey: 'zeus.tableHeaders.virtualSize',
  value:    'virtualSize',
  sort:     'status.virtualSize',
};

export const IMAGE_PROGRESS = {
  name:      'Uploaded',
  labelKey:  'tableHeaders.progress',
  value:     'status.progress',
  sort:      'status.progress',
  formatter: 'ImagePercentageBar',
};

// SSH keys
export const FINGERPRINT = {
  name:     'Fingerprint',
  labelKey: 'tableHeaders.fingerprint',
  value:    'status.fingerPrint',
};

// The column of target volume on snapshot list page
export const SNAPSHOT_TARGET_VOLUME = {
  name:      'TargetVolume',
  labelKey:  'zeus.tableHeaders.snapshotTargetVolume',
  value:     'spec.source.persistentVolumeClaimName',
  sort:      'spec.source.persistentVolumeClaimName',
  formatter: 'SnapshotTargetVolume',
};

// The column of cron expression volume on VM schedules list page
export const VM_SCHEDULE_CRON = {
  name:      'CronExpression',
  labelKey:  'zeus.tableHeaders.cronExpression',
  value:     'spec.cron',
  align:     'center',
  sort:      'spec.cron',
  formatter: 'HarvesterCronExpression',
};

// The column of retain on VM schedules list page
export const VM_SCHEDULE_RETAIN = {
  name:     'Retain',
  labelKey: 'zeus.tableHeaders.retain',
  value:    'spec.retain',
  sort:     'spec.retain',
  align:    'center',
};

// The column of maxFailure on VM schedules list page
export const VM_SCHEDULE_MAX_FAILURE = {
  name:     'MaxFailure',
  labelKey: 'zeus.tableHeaders.maxFailure',
  value:    'spec.maxFailure',
  sort:     'spec.maxFailure',
  align:    'center',
};

// The column of type on VM schedules list page
export const VM_SCHEDULE_TYPE = {
  name:     'Type',
  labelKey: 'zeus.tableHeaders.scheduleType',
  value:    'spec.vmbackup.type',
  sort:     'spec.vmbackup.type',
  align:    'center',
};

// The MACHINE_POOLS column in Virtualization Management list page
export const MACHINE_POOLS = {
  name:     'summary',
  labelKey: 'tableHeaders.machines',
  sort:     false,
  search:   false,
  value:    'nodes.length',
  align:    'center',
  width:    100,
};

// The STORAGE_CLASS column in VM image list page
export const IMAGE_STORAGE_CLASS = {
  name:     'imageStorageClass',
  labelKey: 'zeus.tableHeaders.storageClass',
  sort:     'imageStorageClass',
  value:    'imageStorageClass',
  align:    'left',
  width:    150,
};

export const HARVESTER_DESCRIPTION = {
  ...DESCRIPTION,
  width: 150,
};

// The CIDR_BLOCK column in VPC list page
export const CIDR_BLOCK = {
  name:     'cidrBlock',
  labelKey: 'zeus.subnet.cidrBlock.label',
  sort:     'cidrBlock',
  value:    'spec.cidrBlock',
  align:    'left',
};

// The Protocol column in VPC list page
export const PROTOCOL = {
  name:     'protocol',
  labelKey: 'zeus.subnet.protocol.label',
  sort:     'protocol',
  value:    'spec.protocol',
  align:    'left',
};

// The Provider column in VPC list page
export const PROVIDER = {
  name:     'provider',
  labelKey: 'zeus.subnet.provider.label',
  sort:     'provider',
  value:    'spec.provider',
  align:    'left',
};

// Source VM column in migration.zeushci.io.virtualmachineimport list page
export const VM_IMPORT_SOURCE_VM = {
  name:     'sourceVm',
  labelKey: 'zeus.tableHeaders.vmImportSourceVm',
  value:    'spec.virtualMachineName',
  sort:     'spec.virtualMachineName',
  align:    'left',
};

// Source Cluster column in migration.zeushci.io.virtualmachineimport list page
export const VM_IMPORT_SOURCE_CLUSTER = {
  name:     'sourceCluster',
  labelKey: 'zeus.tableHeaders.vmImportSourceCluster',
  value:    'spec.sourceCluster.name',
  sort:     'spec.sourceCluster.name',
  align:    'left',
};

// Import Status column in migration.zeushci.io.virtualmachineimport list page
export const VM_IMPORT_STATUS = {
  name:     'importStatus',
  labelKey: 'zeus.tableHeaders.vmImportStatus',
  value:    'status.importStatus',
  sort:     'status.importStatus',
  align:    'left',
};

// Datacenter column in migration.zeushci.io.vmwaresource list page
export const VM_IMPORT_SOURCE_V_DC = {
  name:     'datacenter',
  labelKey: 'zeus.tableHeaders.vmImportSourceVDatacenter',
  value:    'spec.dc',
  sort:     'spec.dc',
  align:    'left',
};

// Endpoint column in migration.zeushci.io.vmwaresource list page
export const VM_IMPORT_SOURCE_V_ENDPOINT = {
  name:     'endpoint',
  labelKey: 'zeus.tableHeaders.vmImportSourceVEndpoint',
  value:    'spec.endpoint',
  sort:     'spec.endpoint',
  align:    'left',
};

// Cluster Status column in migration.zeushci.io.vmwaresource list page
export const VM_IMPORT_SOURCE_V_STATUS = {
  name:     'clusterStatus',
  labelKey: 'zeus.tableHeaders.vmImportSourceVClusterStatus',
  value:    'status.status',
  sort:     'status.status',
  align:    'left',
};

// Region column in migration.zeushci.io.openstacksource list page
export const VM_IMPORT_SOURCE_O_REGION = {
  name:     'region',
  labelKey: 'zeus.tableHeaders.vmImportSourceORegion',
  value:    'spec.region',
  sort:     'spec.region',
  align:    'left',
};

// Endpoint column in migration.zeushci.io.openstacksource list page
export const VM_IMPORT_SOURCE_O_ENDPOINT = {
  name:     'endpoint',
  labelKey: 'zeus.tableHeaders.vmImportSourceOEndpoint',
  value:    'spec.endpoint',
  sort:     'spec.endpoint',
  align:    'left',
};

// Cluster Status column in migration.zeushci.io.openstacksource list page
export const VM_IMPORT_SOURCE_O_STATUS = {
  name:     'clusterStatus',
  labelKey: 'zeus.tableHeaders.vmImportSourceOClusterStatus',
  value:    'status.status',
  sort:     'status.status',
  align:    'left',
};

// URL column in migration.zeushci.io.ovasource list page
export const VM_IMPORT_SOURCE_OVA_URL = {
  name:     'url',
  labelKey: 'zeus.tableHeaders.vmImportSourceOVAUrl',
  value:    'spec.url',
  sort:     'spec.url',
  align:    'left',
};

// Status column in migration.zeushci.io.ovasource list page
export const VM_IMPORT_SOURCE_OVA_STATUS = {
  name:     'status',
  labelKey: 'zeus.tableHeaders.vmImportSourceOVAStatus',
  value:    'status.status',
  sort:     'status.status',
  align:    'left',
};
