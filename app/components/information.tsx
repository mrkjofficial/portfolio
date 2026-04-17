import { about } from "@data";

const Information = () => {
	return (
		<div className="border-border flex w-full flex-col items-center justify-center border-y py-3">
			<div className="xs:justify-between flex w-full flex-wrap items-center justify-center gap-4">
				{about.information.map(info => (
					<div className="xs:w-auto flex w-40 items-center justify-center gap-2" key={info.name}>
						<info.icon size={40} strokeWidth={1} />
						<div className="flex flex-col">
							<p className="font-medium">{info.value}</p>
							<span className="text-muted-foreground text-xs">{info.name}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Information;
