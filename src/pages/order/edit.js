import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { orderById, orderEdit } from '../../services/api'
import { useHistory } from 'react-router';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from "@material-ui/core/FormControl";
import { Text } from './style';
import { mask, unMask } from 'remask';


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
  formControl: {
    width: 397,
  },
}));

export default function OrderEdit({ location }) {
  const { orderId } = location.state

  const classes = useStyles();
  const history = useHistory()

  const [deliveryDate, setDeliveryDate] = useState('')
  const [orderItems, setOrderItems] = useState('')
  const [customization, setCustomization] = useState('')
  const [status, setStatus] = useState('')
  const [formOfPayment, setFormOfPayment] = useState('')
  const [message, setMessage] = useState('')

  const deliveryDateFormat = e => {
    const originalValue = unMask(e.target.value)

    const maskedValue = mask(originalValue, ['99/99/9999'])
    setDeliveryDate(maskedValue)
  }

  const handleChangeFormOfPayment = (event) => {
    setFormOfPayment(event.target.value)
  }

  const handleChangeStatus = (event) => {
    setStatus(event.target.value)
  }


  useEffect(() => {
    async function handleOrder() {
      const response = await orderById({ orderId })
      console.log(response)
      setDeliveryDate(response.data.deliveryDate)
      setOrderItems(response.data.orderItems)
      setCustomization(response.data.customization)
      setStatus(response.data.status)
      setFormOfPayment(response.data.formOfPayment)
    }
    handleOrder()
  }, [orderId])

  async function handleEditOrder() {
    console.log(deliveryDate.length)
    if(deliveryDate.length < 10) {
      setMessage("Data incompleta")
    } else {
      await orderEdit({ deliveryDate, orderItems, customization, status, formOfPayment, orderId })
      history.push("/order")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Editar orçamento
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                label="Data que o pedido deve ser entregue."
                onChange={deliveryDateFormat}
                value={deliveryDate}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Roupas"
                onChange={e => setOrderItems(e.target.value)}
                value={orderItems}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                label="Customização"
                onChange={e => setCustomization(e.target.value)}
                value={customization}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={status}
                  onChange={handleChangeStatus}
                  label="Status"
                >
                  <MenuItem value={status}>
                    <em>{status}</em>
                  </MenuItem>
                    {status !== "Aguardando responsta" && <MenuItem value={"Aguardando responsta"}>Aguardando responsta</MenuItem>}
                    {status !== "Respondido" && <MenuItem value={"Respondido"}>Respondido</MenuItem>}
                    {status !== "Enfestando tecido" && <MenuItem value={"Enfestando tecido"}>Enfestando tecido</MenuItem>}
                    {status !== "Cortando tecido" && <MenuItem value={"Cortando tecido"}>Cortando Tecido</MenuItem>}
                    {status !== "Costurando" && <MenuItem value={"Costurando"}>Costurando</MenuItem>}
                    {status !== "Fazendo acabamento" && <MenuItem value={"Fazendo acabamento"}>Fazendo acabamento</MenuItem>}
                    {status !== "Embalando" && <MenuItem value={"Embalando"}>Embalando</MenuItem>}
                    {status !== "Pronto" && <MenuItem value={"Pronto"}>Pronto</MenuItem>}
                    {status !== "Entregue" && <MenuItem value={"Entregue"}>Entregue</MenuItem>}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Método de pagamento *</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={formOfPayment}
                  onChange={handleChangeFormOfPayment}
                  label="Método de pagamento"
                >
                  <MenuItem value={formOfPayment}>
                    <em>{formOfPayment}</em>
                  </MenuItem>
                  {
                    formOfPayment === "Transferência Bradesco" ? <MenuItem value={"Transferência Itaú"}>Transferência Itaú</MenuItem>
                                                               : <MenuItem value={"Transferência Bradesco"}>Transferência Bradesco</MenuItem>
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Text>{message}</Text>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleEditOrder}
          >
            Editar orçamento
          </Button>
        </form>
      </div>
    </Container>
  );
}