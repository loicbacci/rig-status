// MINERSTAT
export interface IMinerStat {
  [worker_name: string]: {
    info: IInfo;
    hardware: IHardwareEntry[];
    revenue: IRevenue;
    mining: IMining;
  }
}

interface IInfo {
  type: string;
      system: string;
      status: string;
      inactive: number;
      status_reason: string;
      status_cpu: string;
      uptime: string;
      sync: number;
      time: string;
      note: number;
      profit_switch: number;
      name: string;
      version: string;
      groups: string;
      cmd: string;
      electricity: number;
      hot: number;
      veryHot: number;
      devices: number;
      consumption: number;
      os: {
        status: string;
        sync: number;
        uptime: string;
        cpu_temp: number;
        cpu_load: number;
        freespace: number;
        freemem: number;
        localip: string
      }
}

interface IHardwareEntry {
  name: string;
  temp: number;
  accepted: number;
  rejected: number;
  fan: number;
  power: number;
  powerMin: number;
  powerMax: number;
  powerStock: number;
  speed: number;
  bus: string;
  core: number;
  coreMax: number;
  memory: number;
  memoryMax: number;
  load: number;
}

interface IRevenue {
  usd_day: number;
  usd_day_dual: number;
  usd_day_cpu: number;
  usd_week: number;
  usd_month: number;
  usd_month_dual: number;
  usd_month_cpu: number;
  btc_day: number;
  btc_week: number;
  btc_month: number;
  coin: number;
  coin_dual: number;
  coin_cpu: number;
  cprice: number;
  cprice_dual: number;
  cprice_cpu: number;
}

interface IMining {
  client: string;
  client_version: string;
  client_cpu: string;
  client_cpu_version: string;
  crypto: string;
  cypto_dual: string;
  cypto_cpu: string;
  pool: string;
  pool_dual: string;
  pool_cpu: string;
  hashrate: {
    hashrate: number;
    hashrate_unit: string;
    hashrate_dual: number;
    hashrate_unit_dual: string;
    hashrate_cpu: number;
    hashrate_unit_cpu: number
  };
  shares: {
    accepted_share: number;
    accepted_share_dual: number;
    rejected_share: number;
    rejected_share_dual: number;
    accepted_share_cpu: number;
    rejected_share_cpu: number;
  }
}
