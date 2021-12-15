export enum Types {
    Acier = 'Acier',
    Combat = 'Combat',
    Dragon = 'Dragon',
    Eau = 'Eau',
    Electrik = 'Electrik',
    Fee = 'Fee',
    Feu = 'Feu',
    Glace = 'Glace',
    Insecte = 'Insecte',
    Normal = 'Normal',
    Plante = 'Plante',
    Poison = 'Poison',
    Psy = 'Psy',
    Roche = 'Roche',
    Sol = 'Sol',
    Spectre = 'Spectre',
    Tenebre = 'Tenebre',
    Vol = 'Vol'
}

export interface Type {
    element: Types;
    weaknesses: Types[];
    resistances: Types[];
    ignore: Types[];
    icon: string;
}

export const types: Type[] = [
    {
        element: Types.Acier,
        weaknesses: [Types.Combat, Types.Feu, Types.Sol],
        resistances: [Types.Acier, Types.Dragon, Types.Fee, Types.Glace, Types.Insecte, Types.Normal, Types.Plante, Types.Psy, Types.Roche, Types.Vol],
        ignore: [Types.Poison],
        icon: './assets/img/Acier.png'
    },
    {
        element: Types.Combat,
        weaknesses: [Types.Fee, Types.Psy, Types.Vol],
        resistances: [Types.Insecte, Types.Roche, Types.Tenebre],
        ignore: [],
        icon: './assets/img/Combat.png'
    },
    {
        element: Types.Dragon,
        weaknesses: [Types.Dragon, Types.Fee, Types.Glace],
        resistances: [Types.Eau, Types.Electrik, Types.Feu, Types.Plante],
        ignore: [],
        icon: './assets/img/Dragon.png'
    },
    {
        element: Types.Eau,
        weaknesses: [Types.Plante, Types.Electrik],
        resistances: [Types.Acier, Types.Eau, Types.Feu, Types.Glace],
        ignore: [],
        icon: './assets/img/Eau.png'
    },
    {
        element: Types.Electrik,
        weaknesses: [Types.Sol],
        resistances: [Types.Acier, Types.Electrik, Types.Vol],
        ignore: [],
        icon: './assets/img/Electrik.png'
    },
    {
        element: Types.Fee,
        weaknesses: [Types.Acier, Types.Poison],
        resistances: [Types.Combat, Types.Insecte, Types.Tenebre],
        ignore: [Types.Dragon],
        icon: './assets/img/Fee.png'
    },
    {
        element: Types.Feu,
        weaknesses: [Types.Sol, Types.Roche, Types.Eau],
        resistances: [Types.Feu, Types.Acier, Types.Fee, Types.Glace, Types.Insecte, Types.Plante],
        ignore: [],
        icon: './assets/img/Feu.png'
    },
    {
        element: Types.Glace,
        weaknesses: [Types.Acier, Types.Feu, Types.Combat, Types.Roche],
        resistances: [Types.Glace],
        ignore: [],
        icon: './assets/img/Glace.png'
    },
    {
        element: Types.Insecte,
        weaknesses: [Types.Feu, Types.Vol, Types.Roche],
        resistances: [Types.Combat, Types.Plante, Types.Sol],
        ignore: [],
        icon: './assets/img/Insecte.png'
    },
    {
        element: Types.Normal,
        weaknesses: [Types.Combat],
        resistances: [],
        ignore: [Types.Spectre],
        icon: './assets/img/Normal.png'
    },
    {
        element: Types.Plante,
        weaknesses: [Types.Feu, Types.Insecte, Types.Vol, Types.Glace, Types.Poison],
        resistances: [Types.Eau, Types.Electrik, Types.Plante, Types.Sol],
        ignore: [],
        icon: './assets/img/Plante.png'
    },
    {
        element: Types.Poison,
        weaknesses: [Types.Psy, Types.Sol],
        resistances: [Types.Combat, Types.Fee, Types.Insecte, Types.Plante, Types.Poison],
        ignore: [],
        icon: './assets/img/Poison.png'
    },
    {
        element: Types.Psy,
        weaknesses: [Types.Insecte, Types.Spectre, Types.Tenebre],
        resistances: [Types.Combat, Types.Psy],
        ignore: [],
        icon: './assets/img/Psy.png'
    },
    {
        element: Types.Roche,
        weaknesses: [Types.Acier, Types.Combat, Types.Eau, Types.Plante, Types.Sol],
        resistances: [Types.Feu, Types.Normal, Types.Poison, Types.Vol],
        ignore: [],
        icon: './assets/img/Roche.png'
    },
    {
        element: Types.Sol,
        weaknesses: [Types.Eau, Types.Glace, Types.Plante],
        resistances: [Types.Poison, Types.Roche],
        ignore: [Types.Electrik],
        icon: './assets/img/Sol.png'
    },
    {
        element: Types.Spectre,
        weaknesses: [Types.Spectre, Types.Tenebre],
        resistances: [Types.Insecte, Types.Poison],
        ignore: [Types.Normal],
        icon: './assets/img/Spectre.png'
    },
    {
        element: Types.Tenebre,
        weaknesses: [Types.Combat, Types.Fee, Types.Insecte],
        resistances: [Types.Spectre, Types.Tenebre],
        ignore: [Types.Psy],
        icon: './assets/img/Tenebre.png'
    },
    {
        element: Types.Vol,
        weaknesses: [Types.Electrik, Types.Glace, Types.Roche],
        resistances: [Types.Combat, Types.Insecte, Types.Plante],
        ignore: [Types.Sol],
        icon: './assets/img/Vol.png'
    }
]