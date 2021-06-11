import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { orderCreate } from '../../services/api'
import { useHistory } from 'react-router';
import { Text } from './style';
import { mask, unMask } from 'remask';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from "@material-ui/core/FormControl";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  delivery: {
    width: '40%',
  },
  formControl: {
    minWidth: 237,
  },
}));

export default function OrderCreate({ location }) {
  const history = useHistory()
  const {clientId} = location.state
  
  const [deliveryDate, setDeliveryDate] = useState('')
  const [orderItems, setOrderItems] = useState('')
  const [customization, setCustomization] = useState('')
  const [formOfPayment, setFormOfPayment] = useState('')
  const [message, setMessage] = useState('')

  console.log(deliveryDate)

  const deliveryDateFormat = e => {
    const originalValue = unMask(e.target.value)

    const maskedValue = mask(originalValue, ['99/99/9999'])
    setDeliveryDate(maskedValue)
  }

  const handleChange = (event) => {
    setFormOfPayment(event.target.value)
  }

  const classes = useStyles();

  async function handleCreateOrder() {
    if(deliveryDate.length < 8) {
      setMessage("Data incompleta")
    } else {
      const response = await orderCreate({ deliveryDate, orderItems, customization, formOfPayment, clientId })
      if (response.status === 201) {
        history.push("/order")
      } else {
        setMessage(response.data.error)
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddShoppingCartIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Criar pedido
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                className={classes.delivery}
                variant="outlined"
                required
                id="deliveryDate"
                label="Data de entrega"
                value={deliveryDate}
                name="deliveryDate"
                onChange={deliveryDateFormat}
              />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Método de pagamento *</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={formOfPayment}
                  onChange={handleChange}
                  label="Método de pagamento"
                >
                  <MenuItem value="Transferência Bradesco">
                    <em>Transferência Bradesco</em>
                  </MenuItem>
                  <MenuItem value={"Transferência Itaú"}>Transferência Itaú</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="clothes"
                label="Roupas"
                name="clothes"
                onChange={e => setOrderItems(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                multiline
                fullWidth
                name="customization"
                label="Customização"
                type="customization"
                id="customization"
                onChange={e => setCustomization(e.target.value)}
              />
            </Grid>
          </Grid>
          <Text>{message}</Text>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCreateOrder}
          >
            Criar orçamento
          </Button>
          <Grid container justify="flex-end">
          </Grid>
        </form>
      </div>
    </Container>
  );
}