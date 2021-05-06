import { updateDate } from './functions'

export const paniersAndFournisseur = (
  fournisseurs,
  paniers,
  creneauxFournisseurs,
  paniersName,
  paniersPrice
) => {
  const result =
    fournisseurs &&
    paniers &&
    creneauxFournisseurs &&
    fournisseurs
      .flatMap((val) =>
        val.paniers.map((key) => ({
          ...val,
          paniers: paniers.find((data) => data.id === parseInt(key)),
          creneaux: creneauxFournisseurs.find(
            (creneau) =>
              `/api/expiration_creaneaus/${creneau.id}` === val.creneaux
          ),
        }))
      )
      .map(
        (data) =>
          data &&
          data.paniers &&
          paniersName && {
            ...data,
            paniername: paniersName.find(
              (name) =>
                `/api/panier_names/${name.id}` === data.paniers.paniername
            ).nom,
          }
      )
      .map(
        (data) =>
          data &&
          data.paniers &&
          paniersPrice && {
            ...data,
            panierprix: paniersPrice.find(
              (prix) => `/api/prix_paniers/${prix.id}` === data.paniers.prix
            ).prix,
          }
      );
  return result;
};

export const paniersAndFournisseurByCategorie = (paniersFournisseur, id) => {
  const date = new Date();
  const soldOut =
    paniersFournisseur &&
    paniersFournisseur.reduce((acc, data) => {
      if (
        data &&
        data.paniers &&
        data.paniers.isActivated &&
        data.paniers.categorie === `/api/categories/${id}` &&
        //data.paniers.categorie === `/api/categories/21` &&

        (data.paniers.qte < 1 ||
          //Date.parse(data.paniers.DateExpirAffichage) - Date.parse(date) <= 0)
          updateDate(data.paniers.DateExpirAffichage, data.creneaux) -
            Date.parse(date) <=
            0)
      ) {
        acc.push(data);
      }
      return acc;
    }, []);

  return (
    paniersFournisseur &&
    paniersFournisseur
      .filter(
        (cat) =>
          cat &&
          cat.paniers &&
          cat.paniers.isActivated &&
          cat.paniers.categorie === `/api/categories/${id}` &&
          //cat.paniers.categorie === `/api/categories/21` &&

          //Date.parse(cat.paniers.DateExpirAffichage) - Date.parse(date) > 0 &&
          updateDate(cat.paniers.DateExpirAffichage, cat.creneaux) -
            Date.parse(date) >
            0 &&
          cat.paniers.qte > 0
      )
      .sort((a, b) => a.panierprix - b.panierprix)
      .sort(
        (a, b) =>
          // Date.parse(a.paniers.DateExpirAffichage) -
          // Date.parse(b.paniers.DateExpirAffichage)
          updateDate(a.paniers.DateExpirAffichage, a.creneaux) -
          updateDate(b.paniers.DateExpirAffichage, b.creneaux)
      )
      .concat(soldOut)
  );
};
