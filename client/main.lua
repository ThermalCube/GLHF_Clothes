local display = false

-- SendPlayerDataToApp() -> example of sending data to the app and changing its corresponding state in the vuex store
function SendPlayerDataToApp()

    local ply = PlayerPedId()
    local sPly = PlayerId()


    SendNUIMessage({
        type = 'setPlayerID',
        data = GetPlayerServerId(sPly)
    })
end

-- SetDisplay() -> changes the toggle state of our vue app ( isVisible = !isVisible )
--              -> it can also be used to change the app view
function SetDisplay(bool, view)
    display = bool
    SendNUIMessage({
        type = 'toggleShow',
    })
    SetNuiFocus(bool, bool)
end

-- Command used to open the view ( you can make the view open on any condition of your choice )
RegisterCommand("openview", function()
   --Test()
   SendPlayerDataToApp()
   SetDisplay(not display, "base")
end)

RegisterNUICallback("fetchData", function(data, cb)

    TriggerEvent('skinchanger:getData', function(components, maxVals)
        
        cb({
            components = components,
            maxVals = maxVals
        })

    end)
        --print("----- MAXVALS -----")
        --print(json.encode(maxVals,{indent = true}))

end)


RegisterNUICallback("updateComponent", function(data, cb)

    TriggerEvent('skinchanger:change', data.component, data.value)

    TriggerEvent('skinchanger:getData', function(components, maxVals)
        cb(maxVals)
    end)
end)

function rgbToHex(r,g,b)
    local rgb = (r * 0x10000) + (g * 0x100) + b
    return string.format("%x", rgb)
end

function Test()

    print("----- TEST -----")

    print("----- HAIR COLORS -----")
    for i = 0,63,1 do
        local r,g,b = GetPedHairRgbColor(i)
        print(string.format("%i - %s", i, rgbToHex(r,g,b)))
    end

    -- TriggerEvent('skinchanger:getData', function(components, maxVals)
    --     print("----- COMPONENTS -----")
    --     print(json.encode(components,{indent = true}))
    --     print("----- MAXVALS -----")
    --     print(json.encode(maxVals,{indent = true}))
    -- end)

end