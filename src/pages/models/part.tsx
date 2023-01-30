// Data Model : BodyPart Data
interface BodyPartInterface {
    pid: String,
    _id: String,
    datestamp: String,
    cracks: Array<any>,
    qcheck: Number
}

export class BodyPart implements BodyPartInterface{
    pid!: String;
    _id!: String;
    cracks!: any[];
    qcheck!: Number;
    datestamp!: String;

    createFromObject(data:any) {
        this.pid = data['PID'];
        this._id = data['_id'];
        this.cracks = data['cracks'];
        this.datestamp = data['datestamp'];
        this.qcheck = data['datestamp'];
    }

    toString() {
        return "Body Part : "+this.pid+"\n"+"Scanned on "+this.datestamp;
    }
}