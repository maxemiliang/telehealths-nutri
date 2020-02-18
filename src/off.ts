interface OpenFoodOptions {
    country?: string
    headers?: any
}

export const defaultOptions: OpenFoodOptions = {
    country: "world",
    headers: new Headers({
        "User-Agent": "NutriScan (Schoolproject) - Preact/Firebase - Version 1.2 - https://nutriscan.maxemiliang.cloud"
    })
}

/** Class OFF Node API Wrappper of OFF API */
export default class OpenFoodAPI {
    private options: OpenFoodOptions
    private URL: string

    /**
     * Create OFF object
     * @param {Object} options - Options for the OFF Object
     * @param {string} options.country - Country for which you want to call OFF API Client
     */
    public constructor(options = defaultOptions) {
        this.options = options
        this.URL = `https://${options.country}.openfoodfacts.org`
    }

    /**
     * It is used to get all brands.
     * @return {Object} It returns a JSON containing all brands
     * @example
     * const worldOFF = new OFF()
     * const indiaOFF = worldOFF.country('in')
     * indiaOFF.getBrands().then(brands => {
     *   // use brands
     * })
     */
    public async getBrands(): Promise<any> {
        return fetch(`${this.URL}/brands.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get a specific product using barcode
     * @param {number} barcode - Barcode of the product you want to fetch details
     * @return {Object} It returns a JSON of the product
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getProduct(7622210288257).then(product => {
     *   // use product
     * })
     */
    public async getProduct(barcode): Promise<any> {
        return fetch(`${this.URL}/api/v0/product/${barcode}.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all details of a specific brand
     * @param {string} brandName - Brand name of the brand you want to fetch details
     * @return {Object} It returns a JSON with all details of the brand
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getBrand('monoprix').then(brand => {
     *   // use brand
     * })
     */
    public async getBrand(brandName): Promise<any> {
        return fetch(`${this.URL}/brand/${brandName}.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all languages on the labels
     * @return {Object} It returns a JSON with list of all languages
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getLanguages().then(languages => {
     *   // use languages
     * })
     */
    public async getLanguages(): Promise<any> {
        return fetch(`${this.URL}/languages.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all Labels from the API
     * @return {Object} It returns a JSON with all labels present on the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getLabels().then(labels => {
     *   // use labels
     * })
     */
    public async getLabels(): Promise<any> {
        return fetch(`${this.URL}/labels.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all additives from the API
     * @return {Object} It returns a JSON with all additives present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getAdditives().then(additives =>{
     *    //use additives
     * })
     */
    public async getAdditives(): Promise<any> {
        return fetch(`${this.URL}/additives.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all allergens from the API
     * @return {Object} It returns a JSON with all allergens present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getAllergens().then(allergens =>{
     *    //use allergens
     * })
     */
    public async getAllergens(): Promise<any> {
        return fetch(`${this.URL}/allergens.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all categories from the API
     * @return {Object} It returns a JSON with all categories present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getCategories().then(categories =>{
     *    //use categories
     * })
     */
    public async getCategories(): Promise<any> {
        return fetch(`${this.URL}/categories.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all countries from the API
     * @return {Object} It returns a JSON with all categories present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getCountries().then(countries =>{
     *    //use countries
     * })
     */
    public async getCountries(): Promise<any> {
        return fetch(`${this.URL}/countries.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all entry dates from the API
     * @return {Object} It returns a JSON with all entry dates present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getEntryDates().then(entry_dates =>{
     *    //use entry_dates
     * })
     */
    public async getEntryDates(): Promise<any> {
        return fetch(`${this.URL}/entry-dates.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all ingredients from the API
     * @return {Object} It returns a JSON with all ingredients present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getIngredients().then(ingredients =>{
     *    //use ingredients
     * })
     */
    public async getIngredients(): Promise<any> {
        return fetch(`${this.URL}/ingredients.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all packagings from the API
     * @return {Object} It returns a JSON with all packagings present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getPackagings().then(packagings =>{
     *    //use packagings
     * })
     */
    public async getPackagings(): Promise<any> {
        return fetch(`${this.URL}/packaging.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get packaging codes from the API
     * @return {Object} It returns a JSON with all packaging codes present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getPackagingCodes().then(packaging_codes =>{
     *    //use packaging_codes
     * })
     */
    public async getPacakgingCodes(): Promise<any> {
        return fetch(`${this.URL}/packager-codes.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all purchase places from the API
     * @return {Object} It returns a JSON with all purchase places present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getPurchasePlaces().then(purchase_places =>{
     *    //use purchase_places
     * })
     */
    public async getPurchasePlaces(): Promise<any> {
        return fetch(`${this.URL}/purchase-places.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all states from the API
     * @return {Object} It returns a JSON with all states present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getStates().then(states =>{
     *    //use states
     * })
     */
    public async getStates(): Promise<any> {
        return fetch(`${this.URL}/states.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all stores from the API
     * @return {Object} It returns a JSON with all stores present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getStores().then(stores =>{
     *    //use stores
     * })
     */
    public async getStores(): Promise<any> {
        return fetch(`${this.URL}/stores.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all trace types from the API
     * @return {Object} It returns a JSON with all traces present in the API
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getTraces().then(traces =>{
     *    //use traces
     * })
     */
    public async getTraces(): Promise<any> {
        return fetch(`${this.URL}/traces.json`).then(resp => {
            return resp.json()
        })
    }

    /**
     * It is used to get all products beginning with the given barcode string
     * @param {string} beginning - Barcode string from which if the barcode begins, then product is to be fetched
     * @return {Object} It returns a JSON of all products that begin with the given barcode string
     * @example
     * const worldOFF = new OFF()
     * worldOFF.getProductsByBarcodeBeginning('3596710').then(products => {
     *   // use products
     * })
     */
    public async getProductsByBarcodeBeginning(beginning): Promise<any> {
        const fill = "x".repeat(13 - beginning.length)
        const barcode = beginning.concat(fill)
        return fetch(`${this.URL}/code/${barcode}.json`).then(resp => {
            return resp.json()
        })
    }
}
