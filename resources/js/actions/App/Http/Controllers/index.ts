import LandingController from './LandingController'
import ContactInquiryController from './ContactInquiryController'
import DashboardController from './DashboardController'
import Teams from './Teams'
import Settings from './Settings'

const Controllers = {
    LandingController: Object.assign(LandingController, LandingController),
    ContactInquiryController: Object.assign(ContactInquiryController, ContactInquiryController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    Teams: Object.assign(Teams, Teams),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers