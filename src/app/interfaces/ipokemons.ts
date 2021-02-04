export interface IPokemon {
  name: string;
  url: string;
}

export interface IResult {
  count: number;
  next: string;
  previous?: string;
  results: IPokemon[];
}
