import React, { useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import MobileNav from "./nav";
import Dialog from "./dialog";
import Image from '../assets/whisper.png';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/GroupAdd";
import axios from "axios";
import { colors } from "./login";
import { Container, TopMobileBar, Header } from "./rooms";
axios.defaults.withCredentials = true;

const fabStyle = {
  position: "fixed",
  bottom: "75px",
  right: "20px",
  color: colors.violet
};

function Contacts(props) {
  // const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [nameErrors, setNameErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(function () {
    checkAuth();
  }, [])
  function checkAuth(e) {
    console.log("Checking Auth from contacts");
    axios.get('/checkAuth')
      .then(function (response) {
        if (response.data.auth === true) {
          setRedirect(false);
        } else {
          setRedirect(true);
        }
      })
      .catch(err => console.log(err))
  }
  function openDialog() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }
  function addContact() {
    setLoading(true);
    axios.post("/addContact", { name })
      .then(function (response) {
        if (response.data.isValid === false) {
          setNameErrors(response.data.errors);
          setLoading(false);
          return;
        }
      }).catch(err => console.log(err));
  }
  return (
    <Container>
      <TopMobileBar>
        <img src={Image} height="55" style={{ marginLeft: 15 }} alt="Logo" />
        <Header>Contacts</Header>
      </TopMobileBar>
      <Dialog open={open}
        close={closeDialog}
        add={addContact}
        name={name}
        setName={(value) => setName(value)}
        errors={nameErrors}
        loading={loading}
      />
      <Fab
        aria-label="add"
        style={fabStyle}
        onClick={openDialog}
      >
        <AddIcon />
      </Fab>
      <MobileNav />
      {redirect ? <Redirect to="/" /> : null}
    </Container>
  );
}

export default Contacts;
