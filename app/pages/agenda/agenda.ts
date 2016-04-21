import {Page, NavController} from "ionic-angular";
import {AgendaEntry} from "../../model/AgendaEntry";
import {AgendaService} from "../../business/AgendaService";
import moment = require("moment");
import {AgendaDetailPage} from "./agenda-detail";


@Page({
	templateUrl: 'build/pages/agenda/agenda.html'
})
export class AgendaPage {
	agenda:AgendaEntry[];
	constructor(private nav:NavController, agendaService:AgendaService) {
		try {
			let start = moment("2016-04-16T07:00:00.000Z").startOf('day');
			let end = moment("2016-04-16T07:00:00.000Z").endOf('day');
			agendaService.getFormattedAgenda(start, end).subscribe((agenda:AgendaEntry[]) => {
				console.log("Formatted agenda:", agenda);
				this.agenda = agenda;
			});
		} catch(err) {
			console.error(err.stack || err);
		}
	}

	entryTapped(event:any, entry:AgendaEntry) {
		this.nav.push(AgendaDetailPage, {
			entry: entry
		});
	}
}