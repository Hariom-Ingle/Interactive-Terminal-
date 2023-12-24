// document.addEventListener('DOMContentLoaded', function() {
//     const outputContainer = document.getElementById('output');
//     const input = document.getElementById('input');
  
//     input.addEventListener('keydown', function(event) {
//       if (event.key === 'Enter') {
//         event.preventDefault();
//         handleCommand(input.value);
//         input.value = '';
//       }
//     });
  
    
//     function handleCommand(command) {
//       const output = document.createElement('div');
//       output.textContent = `$ ${command}`;
//       outputContainer.appendChild(output);
  
      
  
//       // Example: Echo the command
//       if(command=="Help"){
//         const result = document.createElement('div');
//         result.textContent = `whoami:Tells you who are you`;
//         outputContainer.appendChild(result);
//       }
//       else{
//           const result = document.createElement('div');
//       result.textContent = `Not Found `;
//       outputContainer.appendChild(result);

//       }
    
  
//       // Scroll to the bottom to show the latest output
//       outputContainer.scrollTop = outputContainer.scrollHeight;
//     }
//   });
  

document.addEventListener('DOMContentLoaded', function () {
    const outputContainer = document.getElementById('output');
    const input = document.getElementById('input');

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleCommand(input.value);
        input.value = '';
      }
    });

    const terminalCommands = {
      whoami: () => {
        return 'You are [insert user information here]';
      },

      signIn: () => {
        // Redirect to the login page
        return 'Redirecting to the login page...';
      },

      signOut: () => {
        // Sign out the current user
        return 'Signing out the current user...';
      },

      getLocation: () => {
        // Get the current location (Note: This may require user permission and might not work in all environments)
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
            },
            (error) => {
              reject(`Error getting location: ${error.message}`);
            }
          );
        });
      },

      clear: () => {
        // Clear the screen
        outputContainer.innerHTML = '';
        return 'Screen cleared.';
      },

      help: () => {
        const commandList = [
          'whoami: Tells you who you are',
          'signIn: Redirects you to the login page',
          'signOut: Sign out the current user',
          'getLocation: Gets your current location',
          'clear: Clears out everything on the screen'
        ];

        const result = document.createElement('div');

        commandList.forEach(command => {
          const lineDiv = document.createElement('div');
          const [commandName, description] = command.split(':');
          lineDiv.innerHTML = `<span class="command">${commandName}</span>:${description}`;
          result.appendChild(lineDiv);
        });

        return result;
      }
    };

    function handleCommand(command) {
      const output = document.createElement('div');
      output.textContent = `$ ${command}`;
      outputContainer.appendChild(output);

      // Execute the command
      if (command.toLowerCase() === 'help') {
        const result = document.createElement('div');
        result.appendChild(terminalCommands.help());
        outputContainer.appendChild(result);
        outputContainer.scrollTop = outputContainer.scrollHeight;
      } else if (terminalCommands.hasOwnProperty(command)) {
        const result = document.createElement('div');
        const commandResult = terminalCommands[command]();

        if (commandResult instanceof Promise) {
          commandResult.then((locationResult) => {
            result.textContent = locationResult;
            outputContainer.appendChild(result);
            outputContainer.scrollTop = outputContainer.scrollHeight;
          }).catch((error) => {
            result.textContent = error;
            outputContainer.appendChild(result);
            outputContainer.scrollTop = outputContainer.scrollHeight;
          });
        } else {
          result.textContent = commandResult;
          outputContainer.appendChild(result);
          outputContainer.scrollTop = outputContainer.scrollHeight;
        }
      } else {
        const result = document.createElement('div');
        result.textContent = 'Command not found.';
        outputContainer.appendChild(result);
        outputContainer.scrollTop = outputContainer.scrollHeight;
      }
      
    }
  });