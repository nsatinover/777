import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IBillItem } from 'app/shared/model/bill-item.model';
import { BillItemService } from './bill-item.service';
import { IMoneyAccount } from 'app/shared/model/money-account.model';
import { MoneyAccountService } from 'app/entities/money-account';
import { IBills } from 'app/shared/model/bills.model';
import { BillsService } from 'app/entities/bills';

@Component({
    selector: 'jhi-bill-item-update',
    templateUrl: './bill-item-update.component.html'
})
export class BillItemUpdateComponent implements OnInit {
    billItem: IBillItem;
    isSaving: boolean;

    moneyaccounts: IMoneyAccount[];

    bills: IBills[];
    dueDateDp: any;
    paidDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected billItemService: BillItemService,
        protected moneyAccountService: MoneyAccountService,
        protected billsService: BillsService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ billItem }) => {
            this.billItem = billItem;
        });
        this.moneyAccountService.query().subscribe(
            (res: HttpResponse<IMoneyAccount[]>) => {
                this.moneyaccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.billsService.query().subscribe(
            (res: HttpResponse<IBills[]>) => {
                this.bills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.billItem.id !== undefined) {
            this.subscribeToSaveResponse(this.billItemService.update(this.billItem));
        } else {
            this.subscribeToSaveResponse(this.billItemService.create(this.billItem));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBillItem>>) {
        result.subscribe((res: HttpResponse<IBillItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMoneyAccountById(index: number, item: IMoneyAccount) {
        return item.id;
    }

    trackBillsById(index: number, item: IBills) {
        return item.id;
    }
}
