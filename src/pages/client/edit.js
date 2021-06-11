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
import { clientById, clientEdit } from '../../services/api'
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

export default function ClientEdit({ location }) {
  const { clientId } = location.state

  const classes = useStyles();
  const history = useHistory()

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [cnpj, setCnpj] = useState()
  const [phone, setPhone] = useState()
  const [_id, set_id] = useState()

  useEffect(() => {
    async function handleClient() {
      const response = await clientById({ clientId })
      setName(response.data.name)
      setEmail(response.data.email)
      setCnpj(response.data.cnpj)
      setPhone(response.data.phone)
      set_id(response.data._id)
    }
    handleClient()
  }, [clientId])

  async function handleEditClient() {
    await clientEdit({ name, email, cnpj, phone, clientId, _id })
    history.push("/client")
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Editar cliente
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={e => setCnpj(e.target.value)}
                value={cnpj}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={e => setPhone(e.target.value)}
                value={phone}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleEditClient}
          >
            Editar cliente
          </Button>
        </form>
      </div>
    </Container>
  );
}