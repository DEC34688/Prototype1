import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'child-cell',
    template: `<span><button style="height: 20px" (click)="UpdateCampaign()" class="btn btn-info">Update</button></span>
                <button style="height: 20px" (click)="CancelCampaign()" class="btn btn-info">Cancel</button>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class CampaignGridCommandComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public UpdateCampaign() {
       alert(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`);
    }

    public CancelCampaign() {
        alert(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`);
     }

    refresh(): boolean {
        return false;
    }
}