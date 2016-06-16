import {Component, ViewChild} from "@angular/core";
import {NavController, Slides, Popover} from "ionic-angular";
import {AgendaEntry} from "../../model/Lesson";
import {AgendaList} from "./agenda-list";
import {AgendaRange} from "../../model/AgendaRange";
import {AgendaService} from "../../business/AgendaService";
import {AgendaConfig} from "../../config/AgendaConfig";
import {AddPopover} from "../forms/add-popover";
import moment = require("moment");
import {LessonFormPage} from "../forms/lesson";
import {AuthFormPage} from "../forms/auth";
import {AuthService} from "../../framework/AuthService";


@Component({
	templateUrl: 'build/pages/agenda/agenda.html',
	directives: [AgendaList]
})
export class AgendaPage {

	private ranges:AgendaRange[];


	// private _currentDate:string;

	// getter/setter for use with the template 2-way binding
	// get currentDate():string {return this._currentDate;}
	// set currentDate(date:string) {
	// 	this._currentDate = date;
	// 	this.ranges = this.agendaService.getRangesForDate(date);
	// }
	get currentDate():string {return this.agendaService.currentDate;}
	set currentDate(date:string) {
		this.agendaService.currentDate = date;
		this.ranges = this.agendaService.getRangesForDate(date);
	}

	private agenda:AgendaEntry[];

	slideOptions = {initialSlide: AgendaConfig.cachedSlidesOnOneSide}; // used in template

	@ViewChild('slider') slider:Slides;

	constructor(private nav:NavController, private agendaService:AgendaService, private authService:AuthService) {
		// console.log("agenda constructor");
		this.ranges = agendaService.initRanges();
	}

	private loaded:boolean;
	onPageDidEnter() {
		if (!this.loaded) {
			this.loaded = true;
			this.authService._showAuthEmitter().subscribe(() => {
				AuthFormPage.show(this.nav);
			});
		}
		// setTimeout(() => {
		// }, 500);
	}

	ngAfterViewInit() {
		// let swiper = this.slider.getSlider();
	// 	console.log("Slider:", this.slider);
	}

	// rangesPreview():string {
	// 	return this.ranges.map((range:AgendaRange) => range.start.format('L')).join(' ');
	// }

	// private slideWithButton:boolean;

	// Workaround because the swipe to change of slide has bugs
	slideNext() {
		this.agendaService.updateSlideRange(this.ranges, this.slider, false, AgendaConfig.cachedSlidesOnOneSide + 1, false);
		// The user is automatically positioned to the new slide. So we manually create a sliding effect.
		this.slider.slideTo(AgendaConfig.cachedSlidesOnOneSide - 1, 0, false);
		setTimeout(() => {
			this.slider.slideNext(300, false);
		}, 50);

		// this.slideWithButton = true;
		// this.slider.slideTo(AgendaConfig.cachedSlidesOnOneSide - 1, 0);
	}

	// Workaround because the swipe to change of slide has bugs
	slidePrev() {
		this.agendaService.updateSlideRange(this.ranges, this.slider, true, AgendaConfig.cachedSlidesOnOneSide - 1, false);
		// The user is automatically positioned to the new slide. So we manually create a sliding effect.
		this.slider.slideTo(AgendaConfig.cachedSlidesOnOneSide + 1, 0, false);
		setTimeout(() => {
			this.slider.slidePrev(300, false);
		}, 50);

		// this.slideWithButton = true;
		// this.slider.slideTo(AgendaConfig.cachedSlidesOnOneSide + 1, 0);
	}

	updateSlideRange(swiper:any) {
		// if (this.slideWithButton) {
		// 	this.slideWithButton = false;
		// 	this.slider.slideTo(AgendaConfig.cachedSlidesOnOneSide, 300, false);
		// } else {
			let back = swiper.swipeDirection === 'prev';
			let newIndex = this.slider.getActiveIndex();
			this.agendaService.updateSlideRange(this.ranges, this.slider, back, newIndex);
		// }
	}

	// updateSlideRangeEnd(swiper:any) {
	// 	console.log("Did change");
	// }

	// previous: open new lesson page
	// addEntry() {
	// 	this.nav.push(LessonFormPage);
	// }

	popAddList(event) {
		this.nav.present(AddPopover.make(), {ev: event});
	}

}
