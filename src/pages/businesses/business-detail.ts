import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapsService } from '../../common/services/maps.service';
import { OpenHoursService } from '../../common/services/open-hours.service';
import { BusinessesService } from '../../services/businesses.service';
import { DrupalListPage } from '../drupal/drupal-list';

import { ProductsListPage } from '../products/products-list';
import { ReviewsPage } from '../reviews/reviews';
import { ServicesListPage } from '../services/services-list';
import { WordpressListPage } from '../wordpress/wordpress-list';
import { ContactUsPage } from './contact-us';
import { CallService } from '../../common/services/call.service';
import { EmailService } from '../../common/services/email.service';
import { InAppBrowserService } from '../../common/services/in-app-browser.service';

@Component({
	selector: 'page-business-detail',
	templateUrl: './business-detail.html'
})
export class BusinessDetailPage {
	business: any;
	days: any[];
	tiles: any[][] = [
		[
			{ title: 'Services', icon: 'cog', component: ServicesListPage },
			{ title: 'Products', icon: 'cart', component: ProductsListPage }
		]
	];
	isOpen: boolean;

	constructor(
		private callService: CallService,
		private emailService: EmailService,
		private inBrowser: InAppBrowserService,
		public service: BusinessesService,
		private navCtrl: NavController,
		openHoursService: OpenHoursService,
		private mapsService: MapsService
	) {
		this.business = service.getCurrent();
		this.isOpen = this.business.openhours && openHoursService.isBusinessOpen(this.business.openhours);
	}

	getDirections(officeLocation: string) {
		this.mapsService.openMapsApp(officeLocation, this.business.name);
	}

	goToContactUs(business: any) {
		this.navCtrl.push(ContactUsPage, { business: business });
	}

	goToReviews() {
		this.navCtrl.push(ReviewsPage);
	}

	navigateToWordpress() {
		this.navCtrl.push(WordpressListPage);
	}

	navigateToDrupal() {
		this.navCtrl.push(DrupalListPage);
	}

	navigateTo(tile: any) {
		this.navCtrl.push(tile.component);
	}

	call(phone: string) {
		this.callService.call(phone);
	}

	sendEmail(email: string) {
		this.emailService.sendEmail(email);
	}

	openUrl(url: string) {
		this.inBrowser.open(url);
	}
}
