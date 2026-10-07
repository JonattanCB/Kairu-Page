import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/'
*/
const LandingController980bb49ee7ae63891f1d891d2fbcf1c9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LandingController980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

LandingController980bb49ee7ae63891f1d891d2fbcf1c9.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/'
*/
LandingController980bb49ee7ae63891f1d891d2fbcf1c9.url = (options?: RouteQueryOptions) => {
    return LandingController980bb49ee7ae63891f1d891d2fbcf1c9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/'
*/
LandingController980bb49ee7ae63891f1d891d2fbcf1c9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LandingController980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/'
*/
LandingController980bb49ee7ae63891f1d891d2fbcf1c9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LandingController980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/'
*/
const LandingController980bb49ee7ae63891f1d891d2fbcf1c9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: LandingController980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/'
*/
LandingController980bb49ee7ae63891f1d891d2fbcf1c9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: LandingController980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/'
*/
LandingController980bb49ee7ae63891f1d891d2fbcf1c9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: LandingController980bb49ee7ae63891f1d891d2fbcf1c9.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

LandingController980bb49ee7ae63891f1d891d2fbcf1c9.form = LandingController980bb49ee7ae63891f1d891d2fbcf1c9Form
/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos'
*/
const LandingController544782d8b2f9d71b5132a1d3fb2fb63c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LandingController544782d8b2f9d71b5132a1d3fb2fb63c.url(options),
    method: 'get',
})

LandingController544782d8b2f9d71b5132a1d3fb2fb63c.definition = {
    methods: ["get","head"],
    url: '/proyectos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos'
*/
LandingController544782d8b2f9d71b5132a1d3fb2fb63c.url = (options?: RouteQueryOptions) => {
    return LandingController544782d8b2f9d71b5132a1d3fb2fb63c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos'
*/
LandingController544782d8b2f9d71b5132a1d3fb2fb63c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LandingController544782d8b2f9d71b5132a1d3fb2fb63c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos'
*/
LandingController544782d8b2f9d71b5132a1d3fb2fb63c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LandingController544782d8b2f9d71b5132a1d3fb2fb63c.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos'
*/
const LandingController544782d8b2f9d71b5132a1d3fb2fb63cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: LandingController544782d8b2f9d71b5132a1d3fb2fb63c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos'
*/
LandingController544782d8b2f9d71b5132a1d3fb2fb63cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: LandingController544782d8b2f9d71b5132a1d3fb2fb63c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos'
*/
LandingController544782d8b2f9d71b5132a1d3fb2fb63cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: LandingController544782d8b2f9d71b5132a1d3fb2fb63c.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

LandingController544782d8b2f9d71b5132a1d3fb2fb63c.form = LandingController544782d8b2f9d71b5132a1d3fb2fb63cForm
/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
const LandingController942ca6cd23c00b96aec93d460b65ca55 = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LandingController942ca6cd23c00b96aec93d460b65ca55.url(args, options),
    method: 'get',
})

LandingController942ca6cd23c00b96aec93d460b65ca55.definition = {
    methods: ["get","head"],
    url: '/proyectos/{demo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
LandingController942ca6cd23c00b96aec93d460b65ca55.url = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { demo: args }
    }

    if (Array.isArray(args)) {
        args = {
            demo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        demo: args.demo,
    }

    return LandingController942ca6cd23c00b96aec93d460b65ca55.definition.url
            .replace('{demo}', parsedArgs.demo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
LandingController942ca6cd23c00b96aec93d460b65ca55.get = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LandingController942ca6cd23c00b96aec93d460b65ca55.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
LandingController942ca6cd23c00b96aec93d460b65ca55.head = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LandingController942ca6cd23c00b96aec93d460b65ca55.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
const LandingController942ca6cd23c00b96aec93d460b65ca55Form = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: LandingController942ca6cd23c00b96aec93d460b65ca55.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
LandingController942ca6cd23c00b96aec93d460b65ca55Form.get = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: LandingController942ca6cd23c00b96aec93d460b65ca55.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
LandingController942ca6cd23c00b96aec93d460b65ca55Form.head = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: LandingController942ca6cd23c00b96aec93d460b65ca55.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

LandingController942ca6cd23c00b96aec93d460b65ca55.form = LandingController942ca6cd23c00b96aec93d460b65ca55Form

/**
* Multiple routes resolve to \App\Http\Controllers\LandingController::LandingController, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `LandingController['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
const LandingController = {
    '/': LandingController980bb49ee7ae63891f1d891d2fbcf1c9,
    '/proyectos': LandingController544782d8b2f9d71b5132a1d3fb2fb63c,
    '/proyectos/{demo}': LandingController942ca6cd23c00b96aec93d460b65ca55,
}

export default LandingController