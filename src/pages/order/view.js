import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PageviewIcon from '@material-ui/icons/Pageview';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { orderById } from '../../services/api'
import { useHistory } from 'react-router';

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
}));

export default function OrderEdit({ location }) {
  const { orderId } = location.state

  const classes = useStyles();
  const history = useHistory()

  const [deliveryDate, setDeliveryDate] = useState('')
  const [orderItems, setOrderItems] = useState('')
  const [customization, setCustomization] = useState('')
  const [clientName, setClientName] = useState('')
  const [status, setStatus] = useState('')
  const [formOfPayment, setFormOfPayment] = useState('')

  useEffect(() => {
    async function handleOrder() {
      const response = await orderById({ orderId })
      setDeliveryDate(response.data.deliveryDate)
      setOrderItems(response.data.orderItems)
      setCustomization(response.data.customization)
      setStatus(response.data.status)
      setFormOfPayment(response.data.formOfPayment)
      setClientName(response.data.clientName)
    }
    handleOrder()
  }, [orderId])

  async function handleEditOrder() {
    history.push("/order")
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PageviewIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Orçamento
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            <TextField
                variant="outlined"
                disabled
                fullWidth
                autoFocus
                label="Cliente"
                value={clientName}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
            <TextField
                variant="outlined"
                disabled
                fullWidth
                autoFocus
                label="Data que o pedido deve ser entregue."
                value={deliveryDate}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                label="Roupas"
                value={orderItems}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                multiline
                label="Customização"
                value={customization}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                label="Status do pedido"
                value={status}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                label="Forma de pagamento"
                value={formOfPayment}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleEditOrder}
          >
            Orçamentos
          </Button>
        </form>
      </div>
    </Container>
  );
}