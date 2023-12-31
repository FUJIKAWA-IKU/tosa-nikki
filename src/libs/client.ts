import {createClient, MicroCMSClient} from "microcms-js-sdk";

const serviceDomain: string = process.env.MICRO_CMS_DOMAIN as string;
const apiKey: string = process.env.MICRO_CMS_API_KEY as string;
export const client = createClient({
    serviceDomain: serviceDomain,
    apiKey: apiKey,
});
