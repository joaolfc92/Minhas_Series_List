import React, {useState} from 'react';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap'

import { Link } from 'react-router-dom'


const Header = () => {
    const [open, setOpen] = useState(false)


    const togle = () => {
      setOpen(!open)
    }

  return (
   <div>
      <Navbar color="dark" dark expand="md">

          <NavbarBrand tag={Link} to="/">Séries de Nenem </NavbarBrand>

              <NavbarToggler  onClick={togle} />

                <Collapse isOpen={open} navbar>

                      <Nav className="ml-auto" navbar>

                            <NavItem  >

                                      <NavLink tag={Link} to="/generos"> Genêros</NavLink>

                            </NavItem>

                            

                      </Nav>

                </Collapse>


      </Navbar>
   </div>
  )
}

export default Header