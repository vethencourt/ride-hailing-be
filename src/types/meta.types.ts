export interface IMake {
  id: string
  name: string
}

export interface IModel {
  id: string
  makeId: string
  name: string
}

export interface IYear {
  id: string
  modelId: string
  value: number
}
