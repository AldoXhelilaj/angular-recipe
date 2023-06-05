import { Ingriedient } from "../shared/ingriedient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingridients? : Ingriedient[]


    constructor(name: string, description: string, imagePath: string, ingridients?: Ingriedient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingridients = ingridients;

    }
}