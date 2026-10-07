import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
export const demo = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: demo.url(args, options),
    method: 'get',
})

demo.definition = {
    methods: ["get","head"],
    url: '/proyectos/{demo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
demo.url = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return demo.definition.url
            .replace('{demo}', parsedArgs.demo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
demo.get = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: demo.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
demo.head = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: demo.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
const demoForm = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: demo.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
demoForm.get = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: demo.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LandingController::__invoke
* @see app/Http/Controllers/LandingController.php:11
* @route '/proyectos/{demo}'
*/
demoForm.head = (args: { demo: string | number } | [demo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: demo.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

demo.form = demoForm

const projects = {
    demo: Object.assign(demo, demo),
}

export default projects