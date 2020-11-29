import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Paper,
  Radio,
  Button,
} from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(0),
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  container: {
    padding: "1em",
  },
}));

export const StepOne = ({ handleChange, product }) => {
  const classes = useStyles();
  document.title = "Nueva Publicación";
  console.log(product);
  return (
    <form className={classes.root}>
      <Paper elevation={3}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Nombre"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Marca"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Descripción"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel id="demo-simple-select-label">
                    Categoria
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Electronica"}>Electronica</MenuItem>
                    <MenuItem value={"Casa y Hogar"}>Casa y Hogar</MenuItem>
                    <MenuItem value={"Vehiculos"}>Vehiculos</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel id="demo-simple-select">Condicion</InputLabel>
                  <Select
                    labelId="demo-simple-select"
                    id="demo-simple-select1"
                    name="state"
                    value={product.state}
                    onChange={handleChange}
                  >
                    <MenuItem value={"new"}>Nuevo</MenuItem>
                    <MenuItem value={"used"}>Usado</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Precio"
                  name="price"
                  value={product.price}
                  type={"number"}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 1 } }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={6}>
                    <Radio
                      checked={product.typeOfBuy === "buy"}
                      onChange={handleChange}
                      value="buy"
                      name="typeOfBuy"
                      inputProps={{ "aria-label": "Venta" }}
                      id="buy"
                    />
                    <label htmlFor="buy">Venta</label>
                  </Grid>
                  <Grid item xs={6}>
                    <Radio
                      id="change"
                      checked={product.typeOfBuy === "change"}
                      onChange={handleChange}
                      value="change"
                      name="typeOfBuy"
                      inputProps={{ "aria-label": "Cambio" }}
                    />
                    <label htmlFor="change">Cambio</label>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      label="Descripción Larga"
                      multiline
                      rows={11}
                      name="descriptionExtended"
                      value={product.descriptionExtended}
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export const StepTwo = () => {
  return (
    <Grid container>
      <Paper elevation={3} style={{padding: 12}}>
        <Grid item>
          <p style={{textAlign: "justify", padding: 12}}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Exercitationem rem eaque commodi dolorem illo? Quas velit dicta
            perferendis eveniet autem maiores rem, blanditiis sit doloribus,
            distinctio suscipit quae. Necessitatibus qui vel architecto
            assumenda, facilis aliquid possimus nisi debitis sapiente tenetur
            veniam a ut fuga est laboriosam repellat voluptatem laborum eius
            provident tempore sequi iure vero labore? Esse modi omnis laudantium
            alias saepe. Quisquam, et. Cum sunt ipsa dolorum laudantium ut
            tenetur reiciendis, earum enim totam vel aut odio cumque asperiores
            aspernatur officia? Adipisci nobis repellendus quo officia quibusdam
            atque obcaecati alias, voluptates ipsum possimus quisquam neque
            minus! Cupiditate inventore, aspernatur vel temporibus, ab totam
            nostrum, magni illo nam sunt neque. Beatae recusandae ut,
            praesentium unde illo ab minus modi in iusto expedita aspernatur est
            vitae corrupti id aliquam repudiandae eos optio maxime, quae
            voluptatibus eveniet eligendi temporibus cumque commodi. Asperiores
            possimus sequi magni exercitationem! Facere inventore reiciendis
            similique provident quo facilis explicabo non ipsa aliquam odio
            aperiam unde harum consequatur rerum officia architecto, optio
            sapiente illum placeat molestias. Accusamus temporibus, dolore
            obcaecati voluptatem atque facere architecto dolorem. Nulla neque,
            corrupti mollitia corporis ab vel eum aliquam cum, voluptatibus odit
            non officiis officia accusamus tempora consectetur. Optio tempora
            deserunt quos totam cupiditate, suscipit unde autem fugit. Deserunt
            reiciendis temporibus consequuntur, molestias suscipit illo. Quis
            nulla quaerat ipsa, molestias commodi dicta a, laudantium dolores
            enim error deleniti maxime mollitia aperiam cupiditate. Asperiores
            voluptas, ab quibusdam debitis similique laudantium quod omnis eaque
            laboriosam illo aliquam nisi culpa deleniti, magnam non alias
            praesentium ea ut sapiente officiis soluta exercitationem earum!
            Voluptatem tempora vero eos vitae accusamus consequatur repellat,
            nostrum velit dicta reiciendis est amet officiis, excepturi
            voluptatibus qui quod. Repellendus praesentium deserunt at soluta
            atque rerum dolorum commodi. Provident nesciunt molestias ut beatae
            mollitia. Commodi vitae eligendi eius amet accusantium magni
            laudantium sint expedita quas molestiae animi dolorem distinctio,
            alias, doloremque aperiam repellat quidem delectus quia libero
            perspiciatis, at aliquam dignissimos! Architecto sint incidunt qui
            aperiam natus atque cumque quae illo porro et harum odio quasi
            voluptate id veritatis temporibus, molestias sapiente doloribus! Non
            unde repellendus doloremque provident vel delectus quos esse, a
            sapiente temporibus id dignissimos ea earum consequuntur, vitae modi
            sed odio ut impedit perspiciatis deleniti quidem neque corrupti
            quae. Voluptatem, dolorem iste fugiat alias eaque ut quo architecto?
            Nesciunt autem iste odit, provident explicabo beatae ad labore nihil
            molestiae expedita facilis id saepe porro consequatur quam
            quibusdam, amet ipsa quos, animi laborum maiores. Tempora beatae
            iusto optio dignissimos recusandae vel, exercitationem ea, vitae,
            necessitatibus amet quibusdam. Illo atque hic eius in pariatur ad
            unde quis harum illum repellat praesentium optio provident dolorum
            necessitatibus voluptatem reiciendis accusantium incidunt, odit
            quae! Autem recusandae nobis voluptas laboriosam repudiandae? Soluta
            magni rerum illum omnis impedit saepe aliquam similique ratione
            facere voluptates expedita et, vero modi quod maiores pariatur
            tenetur. Qui, incidunt excepturi ipsa quaerat rerum quae suscipit
            voluptate culpa vel ipsam magni nemo! Voluptatibus ipsum vitae
            dolores illo ipsa, magnam facere tenetur doloremque dolor
            necessitatibus suscipit dolore. Incidunt iste error ullam ea? Quasi
            rem quos eum amet enim et odit. Ratione explicabo, alias possimus
            magni mollitia nisi itaque vitae at laborum incidunt consectetur
            eos? Laboriosam, quis commodi atque magnam iusto perferendis
            incidunt sed, asperiores laudantium culpa, iste beatae? Facilis
            tenetur laboriosam veritatis, delectus sint perferendis adipisci
            molestiae sunt recusandae quos deserunt eaque iste quia nihil minima
            reiciendis suscipit ea neque quaerat assumenda ab velit sapiente
            consectetur sequi. Voluptates possimus dolorum fuga quibusdam a ab
            iste consequatur ipsa omnis voluptatum asperiores earum amet, ipsam
            magnam? Repellendus, vitae quo dolorem alias quam quae consequuntur
            cum. Architecto omnis nisi facere hic aliquam. Voluptatum hic eius
            voluptates doloremque nesciunt officia autem magni obcaecati harum
            sed dolorum modi saepe, aperiam natus fugiat exercitationem
            accusantium nam eos nulla fugit sint? Quos repellendus, error et
            corrupti eveniet ab, reiciendis ratione nisi adipisci officia nulla
            voluptate dolor aut nam accusamus, maxime iusto? Nisi assumenda
            sequi ipsum quia consectetur, dolore iste obcaecati cumque,
            architecto nemo eius quam iusto repudiandae vero magni sapiente
            error. Eaque optio atque repellat fugit voluptatum recusandae,
            officia odio repellendus quas eligendi sint in ab voluptatibus
            nesciunt minus non consequuntur perspiciatis architecto qui
            pariatur. Reiciendis eveniet aut soluta consequuntur deleniti
            architecto, in nesciunt eligendi necessitatibus perspiciatis atque
            culpa doloremque. Quam repellat accusamus ipsum dolorum quisquam
            quae reprehenderit vel! Repellat laborum rerum culpa iusto quo
            accusantium dignissimos dicta saepe. Quaerat totam magni accusamus
            sed ab incidunt quod cum vel quisquam corporis odio sunt eaque,
            quam, accusantium, inventore deleniti consequuntur facere repellat.
            Consequatur culpa minus eligendi quis id excepturi tenetur voluptas
            sequi modi corporis distinctio temporibus iusto sit, optio
            laboriosam reiciendis enim blanditiis velit asperiores
            exercitationem dolor alias pariatur. Libero saepe reiciendis
            aspernatur natus corrupti earum harum accusantium sequi odio aliquid
            dolores ducimus, omnis neque repellat necessitatibus quidem! Totam
            perferendis eius voluptas quis eaque amet, aspernatur praesentium
            blanditiis sunt soluta aliquam dolorum illum quibusdam dignissimos
            vel est. Hic voluptas debitis assumenda modi at magni, possimus
            maiores, tempore dolore ullam beatae eaque dolores asperiores
            necessitatibus? Consequuntur necessitatibus saepe cupiditate sed
            consequatur totam ad atque, rem sequi. Suscipit commodi cum
            accusantium? Nostrum ipsa neque a consequuntur itaque. Illo enim hic
            expedita mollitia dolor officia, aut dolore tempora porro
            consequatur ex minus vitae reiciendis modi libero velit harum
            distinctio ipsum repellat nostrum corporis id molestiae. Facere
            quidem cupiditate, earum beatae iste harum ratione neque ut tenetur
            deserunt eum laborum in officia, mollitia accusantium laboriosam
            nemo numquam optio libero deleniti sed blanditiis enim, nobis esse!
            Voluptate sed harum, laudantium quisquam quam consequatur iure vitae
            eveniet eius! Illo necessitatibus officiis explicabo quia
            accusantium perspiciatis a recusandae, aperiam reprehenderit ab
            harum, suscipit veritatis fugiat iusto iste vitae consectetur culpa
            id voluptas odit? Odio optio, officiis nihil ad unde quis animi
            dicta facere laudantium vitae dolorum totam consequuntur id, sunt
            eaque vel? Inventore, dignissimos. Odit saepe atque amet animi quam,
            totam dolore, officia minus accusantium et aliquam dolores impedit
            perferendis velit reiciendis, ipsum aut ipsam suscipit iure ducimus
            voluptatum excepturi veritatis. Corporis ullam, impedit illum nobis
            odit quam, atque, laudantium quia consequatur tempore perferendis
            minus voluptate. Temporibus suscipit minus architecto?
          </p>
        </Grid>
      </Paper>
    </Grid>
  );
};

export const StepTree = () => {
  return <div></div>;
};
