import { _axios } from "../../helper/axios";

export class ManageMenusApi {

    menuCollections = async () => {
        const res = await _axios("get", `/list/collections`);
        return res;
    };
    menuNewCollections = async () => {
        const res = await _axios("get", `/menu/new-collections`);
        return res;
    };

}
