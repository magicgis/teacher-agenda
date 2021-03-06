import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {Subscription} from "rxjs/Subscription";
import {AgendaEntry} from "../../model/Lesson";
import {AgendaService} from "../../business/AgendaService";
import {AgendaDetailPage} from "./agenda-detail";
import {ErrorService} from "../../framework/ErrorService";
import {AgendaRange} from "../../model/AgendaRange";
import moment = require("moment");


@Component({
	selector: 'agenda-list',
	templateUrl: 'build/pages/agenda/agenda-list.html'
})
export class AgendaList {

	// private static defaultStart = moment("2016-05-18T07:00:00.000Z").startOf('day');
	// private static defaultEnd = moment("2016-05-18T07:00:00.000Z").endOf('day');

	agenda:AgendaEntry[];

	private subscription:Subscription;

	private _range:AgendaRange;

	// Debug purpose: to check the current slide index
	@Input() index:number;

	@Input() private set range(range:AgendaRange) {
		if (range === this._range) {
			return;
		}
		this._range = range;
		// Challenge: how to keep the 3 agenda lists separate, with different content, but using the
		// same service to provide the list of entries?
		// All component instances must be automatically updated when a new entry is added through the form.
		try {
			if (this.subscription) {
				this.subscription.unsubscribe();
			}
			// console.log("Loading agenda list for start:", range.start.format('L'), "end:", range.end.format('L'), "index:", this.index);
			this.subscription = this.agendaService.getFormattedAgenda(range.start, range.end).subscribe((agenda:AgendaEntry[]) => {
				// console.log("Agenda from", range.start.format('L'), 'to', range.end.format('L'), 'index:', this.index, agenda.map((e:AgendaEntry) => moment(e.date).format('L') + ' ' + e.startReadable));
				this.agenda = agenda;
			}, (err:any) => this.error.handler(err.code || "agenda.error.loadAgenda")(err));
		} catch(err) {
			this.error.handler("agenda.error.loadAgenda")(err);
		}
	}

	constructor(private nav:NavController, private agendaService:AgendaService, private error:ErrorService) {
	}

	entryTapped(event:any, entry:AgendaEntry) {
		this.nav.push(AgendaDetailPage, {entry: entry, start: this._range.start});
	}
}
