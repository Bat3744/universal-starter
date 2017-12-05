export class Devis {

	public id: number;
	public nom: string;
	public prenom: string;
	public email: string;
	public telephone: string;
	public entreprise: string;
	public naturePrestation: string;
	public info: string;

	constructor() {
		this.nom = '';
		this.prenom = '';
		this.email = '';
		this.telephone = '';
		this.entreprise = '';
		this.naturePrestation = '';
		this.info = '';
	}

	private infoComplementaire:string;

	get _infoComplementaire():string {
		return this.infoComplementaire;
	}

	set _infoComplementaire(infoComplementaire:string) {
		this.infoComplementaire = infoComplementaire;
	}

}
