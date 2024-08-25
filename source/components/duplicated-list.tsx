import React, {useState} from 'react';
import SelectInput from 'ink-select-input';
import {openDir} from '../lib/open-dir.js';
import {Box, Text} from 'ink';
import {parsePath} from '../lib/parse-path.js';
import Spinner from 'ink-spinner';

type DuplicatedFilesListProps = {
	duplicated: string[];
	showPaths: boolean;
	setError: (error: {message: string; name: string} | null) => void;
};

export const DuplicatedFilesList: React.FC<DuplicatedFilesListProps> = ({
	duplicated,
	showPaths,
	setError,
}) => {
	const [oppening, setOppening] = useState(false);
	return (
		<Box gap={1}>
			<SelectInput
				items={duplicated.map(d => ({
					label: d,
					value: d,
				}))}
				itemComponent={props => (
					<Box alignItems="center">
						<Text color={props.isSelected ? 'blue' : 'white'}>
							{showPaths ? props.label : parsePath(props.label)}
						</Text>
						{props.isSelected && oppening && (
							<Box marginLeft={1}>
								<Text color="yellow">
									<Spinner type="dots" />
								</Text>
							</Box>
						)}
					</Box>
				)}
				onSelect={item => {
					setOppening(true);

					openDir(item.value, setError).then(() =>
						setTimeout(() => {
							setOppening(false);
						}, 1000),
					);
				}}
			/>
		</Box>
	);
};
