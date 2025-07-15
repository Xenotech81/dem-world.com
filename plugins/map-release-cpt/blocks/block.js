import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('map-release/latest-maps', {
    edit() {
        return (
            <div {...useBlockProps()}>
                <p>Map Releases will be shown here on the frontend.</p>
            </div>
        );
    },
    save() {
        // Render PHP (shortcode) on frontend, so return null
        return null;
    }
});
