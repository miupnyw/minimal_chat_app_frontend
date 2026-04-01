
Renderer encounters component
			|
			|			=> setup *run before everything
			|
			|			=> beforeCreate *data and event not available
			|
			V
	init Options API
			|
			|			=> created *data, props, methods are ready
			|
			V
Has pre--compiled template? ---- NO ---> Compile temple on-the-fly
			|								|
			YES								V
			|			=>	beforeMount *template compiled, DOM NOT ready yet
			|
			V
initial  render create & insert DOM notes
			|
			|			=> mounted *components now in DOM
			|
			V
		Mounted ---- when data changes ---> beforeUpdate *data changed, DOM not update
			|A										|
			||										V
			||									re-render and patch
			||										|
			||										V
			||------------------------------ updated *DOM updated
			|
	when component is unmounted
			|			=> beforeUnmount *clean up while component, state, refs still working
			|
			V
		unmounted		=> unmounted *clean up but DOM is gone
