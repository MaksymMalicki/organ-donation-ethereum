export interface Transplantation{
  donor: string;
  patient: string;
  procurementOrganiser: string;
  doctor: string;
  label: string;
  timeCreated: number;
  timeTransported: number;
  timeTransplanted: number;
  transplantationStatusConfirmedTime: boolean;
  isSuccessful: boolean;
}
