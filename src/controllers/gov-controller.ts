import axios from "axios";
import {CityGov} from "../interfaces/city-gov";
import {StreetGov} from "../interfaces/street-gov";
import {AuthRequest} from "../common/auth_middleware";
import {Response} from "express";

export class GovController {

    async getAllCities(req: AuthRequest, res: Response): Promise<void> {
        const username: string = req.user._id;
        try {
            const allCities: string[] = (await axios.get(encodeURI(process.env.GET_CITIES))).data.result.records.map((cityGov: CityGov) => cityGov.שם_ישוב);
            console.log(`Get all cities by username ${username} ended successfully, Got ${allCities.length} cities to pass`);
            res.status(200).send(allCities);
        } catch (err) {
            console.log(`Failed to get all cities by username ${username}, Error: ${err}`);
            res.status(500).send({message: `Failed to get all cities by username ${username}, Error: ${err}`});
        }
    }

    async getStreetsByCityName(req: AuthRequest, res: Response): Promise<void> {
        const cityName: string = req.body.cityName
        const username: string = req.user._id
        const url = `${process.env.GET_STREETS}&filters={"שם_ישוב":["${cityName}"]}`;
        try {
            const streets: string[] = (await axios.get(encodeURI(url))).data.result.records.map((streetGov: StreetGov) => streetGov.שם_רחוב);
            console.log(`Get streets of ${cityName} by username ${username} ended successfully, Got ${streets.length} streets to pass`);
            res.status(200).send(streets);
        } catch (err) {
            console.log(`Failed to get streets of ${cityName} by username ${username}, Error: ${err}`);
            res.status(500).send({message: `Failed to get streets of ${cityName} by username ${username}, Error: ${err}`});
        }
    }
}

export default new GovController();
