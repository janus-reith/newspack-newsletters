/**
 * Newsletter Modal
 */

/**
 * WordPress dependencies
 */
import { parse } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Button, Modal } from '@wordpress/components';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { BlockPreview } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './style.scss';

class TemplateModal extends Component {
	generateBlockPreview = () => {
		const { selectedTemplate, templates } = this.props;
		return templates && templates[ selectedTemplate ]
			? parse( templates[ selectedTemplate ].content )
			: null;
	};
	render = () => {
		const {
			closeModal,
			onInsertTemplate,
			onSelectTemplate,
			selectedTemplate,
			templates,
		} = this.props;
		const blockPreview = this.generateBlockPreview();
		return (
			<Modal
				className="newspack-newsletters-modal__frame"
				isDismissible={ false }
				onRequestClose={ closeModal }
				overlayClassName="newspack-newsletters-modal__screen-overlay"
				shouldCloseOnClickOutside={ false }
				shouldCloseOnEsc={ false }
				title={ __( 'Select a layout', 'newspack-newsletters' ) }
			>
				<div className="newspack-newsletters-modal__content">
					<div className="block-editor-patterns newspack-patterns-block-styles">
						{ ( templates || [] ).map( ( { title, image }, index ) => (
							<div
								key={ index }
								className={
									selectedTemplate === index
										? 'selected block-editor-patterns__item'
										: 'block-editor-patterns__item'
								}
								onClick={ () => onSelectTemplate( index ) }
								onKeyDown={ event => {
									if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
										event.preventDefault();
										onSelectTemplate( index );
									}
								} }
								role="button"
								tabIndex="0"
								aria-label={ title }
							>
								<div className="block-editor-patterns__item-preview">
									<img src={ image } alt={ __( 'Preview', 'newspack-newsletters' ) } />
								</div>
								<div className="block-editor-patterns__item-title">{ title }</div>
							</div>
						) ) }
					</div>

					<div className="newspack-newsletters-modal__preview">
						{ blockPreview && <BlockPreview blocks={ blockPreview } __experimentalPadding={ 8 } /> }
					</div>
				</div>

				{ selectedTemplate !== null && (
					<Button isPrimary onClick={ () => onInsertTemplate( selectedTemplate ) }>
						{ sprintf(
							__( 'Use %s layout', 'newspack-newsletter' ),
							templates[ selectedTemplate ].title
						) }
					</Button>
				) }
			</Modal>
		);
	};
}

export default TemplateModal;
