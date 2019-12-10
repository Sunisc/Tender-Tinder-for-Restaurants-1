import React from 'react';
//import ReactDOM from 'react-dom';
import {Navbar, NavbarBrand, NavbarItem, Icon, NavbarBurger, NavbarMenu, NavbarStart, NavbarLink, NavbarDropdown, NavbarDivider, NavbarEnd, Field, Control, Button } from 'bloomer';
//import './Menubar.css'



export default class MenuBar extends React.Component{
    constructor() {
        super()
    }

    render() {
        return (
            <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
            <NavbarItem>
            <NavbarLink>
            <Button isColor='blue' onClick={this.props.loginPopup}>Login</Button>
                </NavbarLink>
            </NavbarItem>
            <NavbarItem>
            <NavbarLink>
            <a href="#news">News</a>
          
                </NavbarLink>
            </NavbarItem>
            <NavbarItem>
            <NavbarLink>
            <a href="#contact">Contact</a>
          
                </NavbarLink>
            </NavbarItem>
            <NavbarItem>
            <NavbarLink>
            <a href="#about">About</a>
                </NavbarLink>
            </NavbarItem>
            <NavbarEnd>
                <NavbarItem>
                    <NavbarLink>
                        <a href="#test">Test</a>
                    </NavbarLink>
                </NavbarItem>
            </NavbarEnd>
          </Navbar>
        );
    }
}

// const MenuBar = () => {
//     return (
        
// /*<div class="topnav">
//   <a class="active" href="#home">Home</a>
//   <a href="#news">News</a>
//   <a href="#contact">Contact</a>
//   <a href="#about">About</a>
// </div> */
// <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
//   <NavbarItem>
//   <NavbarLink>
//   <Button isColor='blue' onClick={loginPopup}>Login</Button>
//       </NavbarLink>
//   </NavbarItem>
//   <NavbarItem>
//   <NavbarLink>
//   <a href="#news">News</a>

//       </NavbarLink>
//   </NavbarItem>
//   <NavbarItem>
//   <NavbarLink>
//   <a href="#contact">Contact</a>

//       </NavbarLink>
//   </NavbarItem>
//   <NavbarItem>
//   <NavbarLink>
//   <a href="#about">About</a>
//       </NavbarLink>
//   </NavbarItem>
// </Navbar>
//     );
// }

// export default MenuBar;