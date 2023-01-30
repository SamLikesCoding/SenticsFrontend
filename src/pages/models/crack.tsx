// Data Model : Crack Data

interface CrackDataInterface {
    crid: String,
    crackLength: Number,
    crackLengthDim: String,
    crackDepth: Number,
    crackDepthDim: String,
    confidence: Number,
    images: String[]
}

export class CrackObject implements CrackDataInterface {
    crid!: String;
    crackLength!: Number;
    crackLengthDim!: String;
    crackDepth!: Number;
    crackDepthDim!: String;
    confidence!: Number;
    images!: String[];

    createFromObject(data:any) {
        this.crid = data['CRID'];
        this.crackLength = data['crackLength'];
        this.crackLengthDim = data['crackLengthDim'];
        this.crackDepth = data['crackDepth'];
        this.crackDepthDim = data['crackDeptDim'];
        this.confidence = data['confidence'];
        this.images = data['image']
    }

    toString() {
        return "Crack ID : "+this.crid;
    }
}