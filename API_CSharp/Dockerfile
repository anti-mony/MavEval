FROM mcr.microsoft.com/dotnet/core/sdk:3.1
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

WORKDIR /app/out
ENTRYPOINT ["dotnet", "API_CSharp.dll"]
