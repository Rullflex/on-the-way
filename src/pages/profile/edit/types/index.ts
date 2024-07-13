export enum ItemType {
  name = 'name',
  surname = 'surname',
  dateOfBirth = 'dateOfBirth',
  email = 'email',
  phone = 'phone'
}

export type IItemsList = { label: string; value: string; type: ItemType };
