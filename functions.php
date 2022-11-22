add_action( 'wp_enqueue_scripts', function() {
	if ( bricks_is_builder_main() ) {
		wp_enqueue_script( 'stu-element-copy-id', get_stylesheet_directory_uri() . '/stu-element-copy-id.js');
	}
} );
