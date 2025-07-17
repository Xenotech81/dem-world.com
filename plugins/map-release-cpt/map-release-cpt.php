<?php
/**
 * Plugin Name: Map Release CPT
 * Description: Registers a custom post type for Map Releases and adds a [map_releases] shortcode.
 * Version: 1.1
 * Author: Alexander R.
 */

// Register the custom post type
function register_map_release_cpt() {
    register_post_type('map_release', [
        'label' => 'Map Releases',
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
        'menu_position' => 5,
        'menu_icon' => 'dashicons-location-alt',
        'rewrite' => array('slug' => 'map_release'),
        'labels' => [
            'name' => 'Map Releases',
            'singular_name' => 'Map Release',
            'add_new_item' => 'Add New Map Release',
            'edit_item' => 'Edit Map Release',
            'new_item' => 'New Map Release',
            'view_item' => 'View Map Release',
            'all_items' => 'All Map Releases',
        ],
    ]);
}
add_action('init', 'register_map_release_cpt');



// Enqueue custom styles
function map_release_enqueue_styles() {
    wp_enqueue_style('map-release-style', plugin_dir_url(__FILE__) . 'map-release-style.css');
}
add_action('wp_enqueue_scripts', 'map_release_enqueue_styles');



// Shortcode to list map releases as cards
function map_release_list_shortcode($atts) {
    $atts = shortcode_atts([
        'count' => 5,
    ], $atts, 'map_releases');

    $query = new WP_Query([
        'post_type' => 'map_release',
        'posts_per_page' => intval($atts['count']),
    ]);

    if (!$query->have_posts()) return '<p>No map releases found.</p>';

    $output = '<div class="map-release-grid">';
    while ($query->have_posts()) {
        $query->the_post();
        $output .= '<div class="map-release-card">';
        if (has_post_thumbnail()) {
            $output .= '<div class="map-release-image"><a href="' . get_permalink() . '">' . get_the_post_thumbnail(get_the_ID(), 'medium') . '</a></div>';
        }
        $output .= '<div class="map-release-content">';
        $output .= '<h3 class="map-release-title"><a href="' . get_permalink() . '">' . get_the_title() . '</a></h3>';
        $output .= '<div class="map-release-excerpt">' . get_the_excerpt() . '</div>';
        $output .= '</div></div>';
    }
    $output .= '</div>';

    wp_reset_postdata();
    return $output;
}
add_shortcode('map_releases', 'map_release_list_shortcode');



// Enqueue Gutenberg block for displaying map releases
function map_release_register_block() {
    // Editor JS (block.js)
    wp_register_script(
        'map-release-block-script',
        plugin_dir_url(__FILE__) . 'blocks/block.js',
        ['wp-blocks', 'wp-element', 'wp-editor'],
        null,
        true
    );

    // Register block with metadata
    register_block_type(__DIR__ . '/blocks');
}
add_action('init', 'map_release_register_block');

// Render block using the existing shortcode
function map_release_block_render() {
    return do_shortcode('[map_releases]');
}


function map_release_activate() {
    register_map_release_cpt(); // Register the custom post type
    flush_rewrite_rules(); // Flush rewrite rules
}
register_activation_hook(__FILE__, 'map_release_activate');
