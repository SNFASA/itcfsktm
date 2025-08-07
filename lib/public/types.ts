// types.ts

export type ExcoCategory =
  | 'Exco MT'
  | 'Exco Sukan'
  | 'Exco Media'
  | 'Exco Akademik'
  | 'Exco Kebajikan'
  | 'Exco Keusahawanan'
  | 'Exco Kerohanian'
  | 'Exco Luar'
  | 'Exco Penerbitan'
  | 'Exco ICT'

export interface Member {
  id: string
  name: string
  position: string
  image?: string
}

export interface ExcoSection {
  category: ExcoCategory
  head?: Member
  members: Member[]
}


