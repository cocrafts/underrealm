import type { FC } from 'react';
import { Fragment } from 'react';

import NarrowScreen from './NarrowScreen';
import WideScreen from './WideScreen';

interface Props {
	responsiveLevel: number;
}

export const CardTypeSection: FC<Props> = ({ responsiveLevel }) => {
	const sectionContent =
		responsiveLevel < 1 ? <WideScreen /> : <NarrowScreen />;

	return <Fragment>{sectionContent}</Fragment>;
};

export default CardTypeSection;
