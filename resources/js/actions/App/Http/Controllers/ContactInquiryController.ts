import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ContactInquiryController::__invoke
* @see app/Http/Controllers/ContactInquiryController.php:13
* @route '/contacto'
*/
const ContactInquiryController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ContactInquiryController.url(options),
    method: 'post',
})

ContactInquiryController.definition = {
    methods: ["post"],
    url: '/contacto',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactInquiryController::__invoke
* @see app/Http/Controllers/ContactInquiryController.php:13
* @route '/contacto'
*/
ContactInquiryController.url = (options?: RouteQueryOptions) => {
    return ContactInquiryController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactInquiryController::__invoke
* @see app/Http/Controllers/ContactInquiryController.php:13
* @route '/contacto'
*/
ContactInquiryController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ContactInquiryController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactInquiryController::__invoke
* @see app/Http/Controllers/ContactInquiryController.php:13
* @route '/contacto'
*/
const ContactInquiryControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ContactInquiryController.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactInquiryController::__invoke
* @see app/Http/Controllers/ContactInquiryController.php:13
* @route '/contacto'
*/
ContactInquiryControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ContactInquiryController.url(options),
    method: 'post',
})

ContactInquiryController.form = ContactInquiryControllerForm

export default ContactInquiryController