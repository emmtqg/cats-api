export type CatData = {
  breeds: Array<string>,
  id: string,
  url: string,
  height: number,
  width: number
}
export type Breed = {
    adaptability: number,
    affection_level: number,
    alt_names: string | null,
    cfa_url: string,
    child_friendly: number,
    country_code: string,
    description: string,
    dog_friendly: number,
    energy_level: number,
    grooming: number,
    hairless: boolean,
    health_issues: number,
    hypoallergenic: boolean,
    id: string,
    image: {
      height: number,
      id: string,
      url: string,
      width: number
    },
    indoor: number,
    intelligence: number,
    lap: number,
    life_span: string,
    name: string,
    origin: string,
    shedding_level: number,
    social_needs: number,
    stranger_friendly: number,
    temperament: string,
    weight: {
      imperial: string,
      metric: string
    },
    wikipedia_url: string
}
