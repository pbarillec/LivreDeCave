export class Wine {
    constructor(
        public id: number,
        public name: string,
        public appellation: string,
        public producer: string,
        public color: string,
        public vintage: number | null,
        public purchaseDate: string,
        public purchasePrice: string,
        public bottleSize: number,
        public quantityBought: number,
        public quantityLeft: number,
        public peak: number | null,
        public notes: string,
        public wineType: string,
        public quantityDrunk: number,
        public infos: string | null
    ) {}

    // isInStock(): boolean {
    //     return this.quantityLeft > 0;
    // }

    // isAtPeak(currentYear: number): boolean {
    //     const [startYear, endYear] = this.peak.split('-').map(Number);
    //     return currentYear >= startYear && currentYear <= endYear;
    // }
}
